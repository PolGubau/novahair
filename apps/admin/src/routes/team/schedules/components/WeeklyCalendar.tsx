import { Button } from "@novahair/ui";
import { format, isSameDay } from "date-fns";
import { useState } from "react";

interface Schedule {
	staff: string;
	start: string;
	end: string;
}

interface WeeklyCalendarProps {
	weekDays: Date[];
	selectedDates: Date[];
	toggleDate: (date: Date) => void;
	getSchedulesForDay: (date: Date) => Schedule[];
	isLoading: boolean;
	colorMap: Record<string, string>;
	onScheduleDrag?: (
		schedule: Schedule & { originalDate: Date },
		newDate: Date,
		newStart: string,
		newEnd: string,
	) => void;
}

const PIXELS_PER_MINUTE = 0.5; // 0.5 pixel per minute, total 720px height
const DAY_HEIGHT = 720; // 24 hours * 60 minutes * 0.5

function getMinutesFromMidnight(time: string): number {
	const [hours, minutes] = time.split(":").map(Number);
	return hours * 60 + minutes;
}

function formatTime(minutes: number): string {
	// Round to nearest 15-minute interval
	const roundedMinutes = Math.round(minutes / 15) * 15;
	const hours = Math.floor(roundedMinutes / 60);
	const mins = roundedMinutes % 60;
	return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
}

function getSchedulePosition(sortedSchedules: Schedule[], index: number) {
	const schedule = sortedSchedules[index];
	const start = getMinutesFromMidnight(schedule.start);
	const end = getMinutesFromMidnight(schedule.end);

	// Find overlapping schedules
	const overlapping = sortedSchedules.slice(0, index).filter((s) => {
		const sStart = getMinutesFromMidnight(s.start);
		const sEnd = getMinutesFromMidnight(s.end);
		return start < sEnd && end > sStart;
	});

	const column = overlapping.length;
	const totalColumns = column + 1;

	return {
		left: `${(column / totalColumns) * 100}%`,
		width: `${100 / totalColumns}%`,
	};
}
export function WeeklyCalendar({
	weekDays,
	selectedDates,
	toggleDate,
	getSchedulesForDay,
	isLoading,
	colorMap,
	onScheduleDrag,
}: WeeklyCalendarProps) {
	const [draggedSchedule, setDraggedSchedule] = useState<{
		schedule: Schedule;
		originalDate: Date;
		dragOffset: { x: number; y: number };
		isResizing: "top" | "bottom" | null;
		originalStart: string;
		originalEnd: string;
	} | null>(null);

	const handleDragStart = (
		e: React.DragEvent,
		schedule: Schedule,
		day: Date,
	) => {
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		const y = e.clientY - rect.top;
		const height = rect.height;

		// Check if dragging near top or bottom border (within 20% of height)
		const resizeThreshold = height * 0.2;
		const isNearTop = y <= resizeThreshold;
		const isNearBottom = y >= height - resizeThreshold;

		e.dataTransfer.effectAllowed = "move";
		setDraggedSchedule({
			schedule,
			originalDate: day,
			dragOffset: { x: e.clientX - rect.left, y: e.clientY - rect.top },
			isResizing: isNearTop ? "top" : isNearBottom ? "bottom" : null,
			originalStart: schedule.start,
			originalEnd: schedule.end,
		});
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		if (draggedSchedule?.isResizing) {
			e.dataTransfer.dropEffect = "none";
		} else {
			e.dataTransfer.dropEffect = "move";
		}
	};

	const handleDrop = (e: React.DragEvent, targetDay: Date) => {
		e.preventDefault();
		if (!draggedSchedule || !onScheduleDrag) return;

		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		const y = e.clientY - rect.top;
		const minutes = Math.round(y / PIXELS_PER_MINUTE);
		const clampedMinutes = Math.max(0, Math.min(1440, minutes));

		let newStart: string;
		let newEnd: string;
		let finalDate: Date;

		if (draggedSchedule.isResizing === "top") {
			// Resizing from top - change start time
			newStart = formatTime(clampedMinutes);
			newEnd = draggedSchedule.originalEnd;
			finalDate = draggedSchedule.originalDate;
		} else if (draggedSchedule.isResizing === "bottom") {
			// Resizing from bottom - change end time
			newStart = draggedSchedule.originalStart;
			newEnd = formatTime(clampedMinutes);
			finalDate = draggedSchedule.originalDate;
		} else {
			// Moving the entire schedule
			const duration =
				getMinutesFromMidnight(draggedSchedule.schedule.end) -
				getMinutesFromMidnight(draggedSchedule.schedule.start);
			newStart = formatTime(clampedMinutes);
			newEnd = formatTime(clampedMinutes + duration);
			finalDate = targetDay;
		}

		// Only call if times are valid
		const startMinutes = getMinutesFromMidnight(newStart);
		const endMinutes = getMinutesFromMidnight(newEnd);
		if (startMinutes < endMinutes) {
			onScheduleDrag(
				{
					...draggedSchedule.schedule,
					originalDate: draggedSchedule.originalDate,
				},
				finalDate,
				newStart,
				newEnd,
			);
		}

		setDraggedSchedule(null);
	};

	const handleDragEnd = () => {
		setDraggedSchedule(null);
	};
	return (
		<div className="grid grid-cols-7 gap-4">
			{weekDays.map((day) => {
				const schedules = getSchedulesForDay(day);
				return (
					<div
						key={day.toISOString()}
						className={`border rounded-lg p-2 ${isSameDay(day, new Date()) ? "bg-yellow-100" : ""}`}
						style={{ height: `${DAY_HEIGHT + 40}px` }} // extra for header
						data-day={day.toISOString()}
						onDragOver={handleDragOver}
						onDrop={(e) => handleDrop(e, day)}
					>
						<div className="text-center mb-2">
							<div className="font-semibold">{format(day, "EEEE")}</div>
							<div className="text-sm text-gray-500">
								{format(day, "d MMM")}
							</div>
							<Button
								variant={
									selectedDates.some((d) => isSameDay(d, day))
										? "primary"
										: "outline"
								}
								size="sm"
								className="mt-1"
								onClick={() => toggleDate(day)}
								disabled={isLoading}
							>
								{selectedDates.some((d) => isSameDay(d, day))
									? "Seleccionado"
									: "Seleccionar"}
							</Button>
						</div>
						<div
							className="relative border-t"
							style={{ height: `${DAY_HEIGHT}px` }}
						>
							{/* Hour lines */}
							{Array.from({ length: 24 }, (_, hour) => (
								<div
									// biome-ignore lint/suspicious/noArrayIndexKey: key
									key={hour}
									className="absolute w-full border-t border-gray-300"
									style={{ top: `${hour * 60 * PIXELS_PER_MINUTE}px` }}
								>
									<span className="absolute -left-8 -top-2 text-xs text-gray-500">
										{hour}:00
									</span>
								</div>
							))}
							{isLoading ? (
								<div className="absolute inset-0 flex items-center justify-center">
									<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
								</div>
							) : (
								(() => {
									const sortedSchedules = [...schedules].sort((a, b) =>
										a.start.localeCompare(b.start),
									);
									return sortedSchedules.map((schedule, index) => {
										const startMinutes = getMinutesFromMidnight(schedule.start);
										const endMinutes = getMinutesFromMidnight(schedule.end);
										const top = startMinutes * PIXELS_PER_MINUTE;
										const height =
											(endMinutes - startMinutes) * PIXELS_PER_MINUTE;
										const position = getSchedulePosition(
											sortedSchedules,
											index,
										);
										const bgColor = colorMap[schedule.staff] || "bg-gray-500";
										return (
											<div
												// biome-ignore lint/suspicious/noArrayIndexKey: key
												key={index}
												className={`absolute ${bgColor} text-white p-1 rounded text-xs overflow-hidden select-none ${
													draggedSchedule?.schedule === schedule
														? "opacity-50"
														: ""
												}`}
												style={{
													top: `${top}px`,
													height: `${height}px`,
													...position,
													cursor:
														draggedSchedule?.schedule === schedule
															? draggedSchedule.isResizing === "top"
																? "ns-resize"
																: draggedSchedule.isResizing === "bottom"
																	? "ns-resize"
																	: "move"
															: "move",
												}}
												title={`${schedule.staff}: ${schedule.start} - ${schedule.end}`}
												draggable
												onDragStart={(e) => handleDragStart(e, schedule, day)}
												onDragEnd={handleDragEnd}
											>
												<div className="font-medium truncate">
													{schedule.staff}
												</div>
												<div className="truncate">
													{schedule.start} - {schedule.end}
												</div>
											</div>
										);
									});
								})()
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
}

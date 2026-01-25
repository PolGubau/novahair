import { Button } from "@novahair/ui";
import i18n from "@novahair/utils/i18n/setup";
import { format, isSameDay } from "date-fns";
import { useEffect, useState } from "react";

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

const START_HOUR = 6;
const END_HOUR = 22;
const HOURS_COUNT = END_HOUR - START_HOUR;

// Hook para calcular height disponible y pixels por minuto
function useCalendarSizing() {
	const [dimensions, setDimensions] = useState({
		height: 400, // fallback mínimo
		pixelsPerMinute: 0.5,
	});

	useEffect(() => {
		const calculateDimensions = () => {
			// Estimar height disponible (viewport - header/footer aproximado)
			const windowHeight = window.innerHeight;
			const estimatedHeaderFooter = 220; // px aproximados para header, footer, padding
			const availableHeight = Math.max(
				100,
				windowHeight - estimatedHeaderFooter,
			);

			// Calcular pixels por minuto para ocupar todo el height disponible
			const totalMinutes = HOURS_COUNT * 60;
			const pixelsPerMinute = availableHeight / totalMinutes;

			setDimensions({
				height: availableHeight,
				pixelsPerMinute: Math.max(0.3, Math.min(1.5, pixelsPerMinute)), // límites razonables
			});
		};

		calculateDimensions();
		window.addEventListener("resize", calculateDimensions);
		return () => window.removeEventListener("resize", calculateDimensions);
	}, []);

	return dimensions;
}

function getMinutesFromMidnight(time: string): number {
	const [hours, minutes] = time.split(":").map(Number);
	return hours * 60 + minutes;
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

function weekDayLabel(date: Date, locale = "en-US") {
	return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(date);
}
function dayLabel(date: Date, locale = "en-US") {
	return new Intl.DateTimeFormat(locale, {
		day: "numeric",
	}).format(date);
}
export function WeeklyCalendar({
	weekDays,
	selectedDates,
	toggleDate,
	getSchedulesForDay,
	isLoading,
	colorMap,
}: WeeklyCalendarProps) {
	const { height: DAY_HEIGHT, pixelsPerMinute: PIXELS_PER_MINUTE } =
		useCalendarSizing();
	return (
		<ul className="flex w-full overflow-x-auto gap-0 border rounded-xl divide-x divide-foreground/5">
			{weekDays.map((day) => {
				const schedules = getSchedulesForDay(day);
				return (
					<li
						key={day.toISOString()}
						className={`flex-1 min-w-36 overflow-hidden ${weekDays.indexOf(day) === 0 ? "pl-10" : ""} ${isSameDay(day, new Date()) ? "bg-foreground/5" : ""}`}
						style={{ height: `${DAY_HEIGHT + 40}px` }} // extra for header
						data-day={day.toISOString()}
					>
						<Button
							data-selected={selectedDates.some((d) => isSameDay(d, day))}
							className="p-2 rounded-none h-fit flex flex-col w-full data-[selected=true]:bg-primary/20 border-none"
							variant="ghost"
							size="sm"
							onClick={() => toggleDate(day)}
							disabled={isLoading}
						>
							<div className="flex flex-col items-center">
								<span className="text-sm text-foreground/60 capitalize">
									{weekDayLabel(day, i18n.language)}
								</span>
								<h2 className="font-semibold capitalize">
									{dayLabel(day, i18n.language)}
								</h2>
							</div>
						</Button>
						<div
							className="relative border-t"
							style={{ height: `${DAY_HEIGHT}px` }}
						>
							{/* Hour lines */}
							{Array.from({ length: HOURS_COUNT }, (_, i) => {
								const hour = i + START_HOUR;
								function formatHourLabel(hour: number, locale = "en-US") {
									const date = new Date();
									date.setHours(hour, 0, 0, 0);

									return new Intl.DateTimeFormat(locale, {
										hour: "numeric",
										hour12: false,
									}).format(date);
								}
								return (
									<div
										// biome-ignore lint/suspicious/noArrayIndexKey: key
										key={hour}
										className="absolute w-full border-t border-foreground/10"
										style={{ top: `${i * 60 * PIXELS_PER_MINUTE}px` }}
									>
										{/* Hour labels only on first column */}
										{weekDays.indexOf(day) === 0 && (
											<span className="absolute -left-8 -top-2 text-xs text-muted-foreground">
												{formatHourLabel(hour, i18n.language)}
											</span>
										)}
									</div>
								);
							})}
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
										const adjustedStart = startMinutes - START_HOUR * 60;
										const adjustedEnd = endMinutes - START_HOUR * 60;
										const top = Math.max(0, adjustedStart) * PIXELS_PER_MINUTE;
										const height =
											Math.max(0, adjustedEnd - adjustedStart) *
											PIXELS_PER_MINUTE;
										const position = getSchedulePosition(
											sortedSchedules,
											index,
										);
										const bgColor = colorMap[schedule.staff] || "bg-gray-500";
										return (
											<div
												// biome-ignore lint/suspicious/noArrayIndexKey: key
												key={index}
												className={`absolute ${bgColor} text-white p-1 rounded text-xs overflow-hidden select-none`}
												style={{
													top: `${top}px`,
													height: `${height}px`,
													...position,
												}}
												title={`${schedule.staff}: ${schedule.start} - ${schedule.end}`}
												draggable
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
					</li>
				);
			})}
		</ul>
	);
}

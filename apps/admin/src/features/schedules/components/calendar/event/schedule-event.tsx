import { Avatar, Drawer } from "@novahair/ui";
import {
	getTime,
	parseISODate,
	sizes,
	type TranslationKey,
	toISODate,
} from "@novahair/utils";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useScheduleResize } from "../hooks/use-schedule-resize";
import type { Schedule } from "../weekly-calendar";
import { ScheduleDetails } from "./schedule-details";

type ScheduleEventProps = {
	day: Date;
	schedule: Schedule;
	index: number;
	schedules: Schedule[];
	pixelsPerMinute: number;
	startHour: number;
};

function getMinutesFromMidnight(date: Date): number {
	// Use UTC hours and minutes to match backend timezone
	const hours = date.getUTCHours();
	const minutes = date.getUTCMinutes();
	return hours * 60 + minutes;
}

function getSchedulePosition(sortedSchedules: Schedule[], index: number) {
	const schedule = sortedSchedules[index];
	const start = getMinutesFromMidnight(parseISODate(schedule.start));
	const end = getMinutesFromMidnight(parseISODate(schedule.end));

	// Find overlapping schedules
	const overlapping = sortedSchedules.slice(0, index).filter((s) => {
		const sStart = getMinutesFromMidnight(parseISODate(s.start));
		const sEnd = getMinutesFromMidnight(parseISODate(s.end));
		return start < sEnd && end > sStart;
	});

	const column = overlapping.length;
	const totalColumns = column + 1;

	return {
		left: `${(column / totalColumns) * 100}%`,
		width: `${100 / totalColumns}%`,
	};
}

export function ScheduleEvent({
	schedule,
	index,
	schedules,
	pixelsPerMinute,
	startHour,
	day,
}: ScheduleEventProps) {
	const { t } = useTranslation();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const {
		isResizing,
		resizeHandle,
		tempHeight,
		tempTop,
		isPending,
		handleMouseDown,
		handleMouseMove,
		handleMouseUp,
	} = useScheduleResize(schedule, pixelsPerMinute, startHour);

	// Add global mouse event listeners for resize
	useEffect(() => {
		if (isResizing) {
			window.addEventListener("mousemove", handleMouseMove);
			window.addEventListener("mouseup", handleMouseUp);
			return () => {
				window.removeEventListener("mousemove", handleMouseMove);
				window.removeEventListener("mouseup", handleMouseUp);
			};
		}
	}, [isResizing, handleMouseMove, handleMouseUp]);

	const startDate = parseISODate(schedule.start);
	const endDate = parseISODate(schedule.end);
	const startMinutes = getMinutesFromMidnight(startDate);
	const endMinutes = getMinutesFromMidnight(endDate);
	const adjustedStart = startMinutes - startHour * 60;
	const adjustedEnd = endMinutes - startHour * 60;
	const top = tempTop !== null ? tempTop : Math.max(0, adjustedStart) * pixelsPerMinute;
	const height = tempHeight !== null ? tempHeight : Math.max(
		20,
		Math.max(0, adjustedEnd - adjustedStart) * pixelsPerMinute,
	);
	const position = getSchedulePosition(schedules, index);
	const bgColor = schedule.staff.color || "#888888";

	const [startFormattedTime] = getTime(toISODate(startDate));
	const [endFormattedTime] = getTime(toISODate(endDate));
	return (
		<>
			<Drawer
				onClose={() => setIsDrawerOpen(false)}
				open={isDrawerOpen}
				title={
					t("[staff]_turn_at_[date]", {
						date: startFormattedTime,
						staff: schedule.staff.name,
					}) as TranslationKey
				}
			>
				<ScheduleDetails
					day={day}
					onClose={() => setIsDrawerOpen(false)}
					onSuccess={() => {
						setIsDrawerOpen(false);
					}}
					schedule={schedule}
				/>
			</Drawer>
			<div
				className={
					"text-left absolute text-white border border-background rounded-lg text-sm overflow-hidden select-none group transition-opacity font-normal"
				}
				style={{
					backgroundColor: bgColor,
					height: `${height}px`,
					top: `${top}px`,
					...position,
					opacity: isPending ? 0.5 : 1,
					cursor: isResizing ? "ns-resize" : "pointer",
				}}
				title={`${schedule.staff.name}: ${startDate.toLocaleTimeString('default', { timeZone: 'UTC' })} - ${endDate.toLocaleTimeString('default', { timeZone: 'UTC' })}`}
			>
				{/* Top resize handle */}
				<div
					className="absolute top-0 left-0 right-0 h-2 cursor-ns-resize hover:bg-background/40 transition-colors z-10"
					onMouseDown={(e) => handleMouseDown(e, "top")}
					title="Drag to change start time"
				/>

				{/* Content */}
				<div
					className="h-full w-full flex p-1 flex-col hover:opacity-80 transition-opacity cursor-pointer"
					onClick={() => !isResizing && setIsDrawerOpen(true)}
				>
					<div className="truncate flex items-center gap-2 mb-1">
						<Avatar
							alt={schedule.staff.name}
							size={sizes.sm}
							src={schedule.staff.avatarUrl ?? ""}
						/>
						<span className="">{schedule.staff.name}</span>
					</div>
					<div className="truncate text-xs text-background/80">
						{startFormattedTime} - {endFormattedTime}
					</div>
				</div>

				{/* Bottom resize handle */}
				<div
					className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize hover:bg-background/40 transition-colors z-10"
					onMouseDown={(e) => handleMouseDown(e, "bottom")}
					title="Drag to change end time"
				/>
			</div>
		</>
	);
}

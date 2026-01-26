import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	Drawer,
	getInitial,
} from "@novahair/ui";
import {
	type TranslationKey,
	getTime,
	parseISODate,
	toISODate,
} from "@novahair/utils";
import { t } from "i18next";
import { useState } from "react";
import type { Schedule } from "../weekly-calendar";
import { EditSchedule } from "./edit-schedule";

type ScheduleEventProps = {
	day: Date;
	schedule: Schedule;
	index: number;
	schedules: Schedule[];
	pixelsPerMinute: number;
	startHour: number;
};

function getMinutesFromMidnight(date: Date): number {
	const hours = date.getHours();
	const minutes = date.getMinutes();
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
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const startDate = parseISODate(schedule.start);
	const endDate = parseISODate(schedule.end);
	const startMinutes = getMinutesFromMidnight(startDate);
	const endMinutes = getMinutesFromMidnight(endDate);
	const adjustedStart = startMinutes - startHour * 60;
	const adjustedEnd = endMinutes - startHour * 60;
	const top = Math.max(0, adjustedStart) * pixelsPerMinute;
	const height = Math.max(
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
				open={isDrawerOpen}
				onClose={() => setIsDrawerOpen(false)}
				title={
					t("[staff]_turn_at_[date]", {
						staff: schedule.staff.name,
						date: startFormattedTime,
					}) as TranslationKey
				}
			>
				<EditSchedule
					day={day}
					schedule={schedule}
					onSuccess={() => {
						setIsDrawerOpen(false);
					}}
					onClose={() => setIsDrawerOpen(false)}
				/>
			</Drawer>
			<Button
				className={
					"text-left absolute text-white border border-background rounded-lg text-sm overflow-hidden select-none cursor-pointer hover:opacity-80 transition-opacity font-normal"
				}
				style={{
					backgroundColor: bgColor,
					top: `${top}px`,
					height: `${height}px`,
					...position,
				}}
				title={`${schedule.staff.name}: ${startDate.toLocaleTimeString()} - ${endDate.toLocaleTimeString()}`}
				onClick={() => setIsDrawerOpen(true)}
			>
				<div className="h-full w-full flex p-1 flex-col">
					<div className="truncate flex items-center gap-2 mb-1">
						<Avatar size="sm"		src={schedule.staff.avatarUrl ?? ""}
								alt={schedule.staff.name} />
						 
						<span className="">{schedule.staff.name}</span>
					</div>
					<div className="truncate text-xs text-background/80">
						{startFormattedTime} - {endFormattedTime}
					</div>
				</div>
			</Button>
		</>
	);
}

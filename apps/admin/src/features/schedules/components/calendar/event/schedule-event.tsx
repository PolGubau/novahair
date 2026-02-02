import { Avatar, Button, Drawer } from "@novahair/ui";
import {
	getTime,
	parseISODate,
	sizes,
	type TranslationKey,
	toISODate,
} from "@novahair/utils";
import { useState } from "react";
import { useTranslation } from "react-i18next";
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
				onClose={() => setIsDrawerOpen(false)}
				open={isDrawerOpen}
				title={
					t("[staff]_turn_at_[date]", {
						date: startFormattedTime,
						staff: schedule.staff.name,
					}) as TranslationKey
				}
			>
				<EditSchedule
					day={day}
					onClose={() => setIsDrawerOpen(false)}
					onSuccess={() => {
						setIsDrawerOpen(false);
					}}
					schedule={schedule}
				/>
			</Drawer>
			<Button
				className={
					"text-left absolute text-white border border-background rounded-lg text-sm overflow-hidden select-none cursor-pointer hover:opacity-80 transition-opacity font-normal"
				}
				onClick={() => setIsDrawerOpen(true)}
				style={{
					backgroundColor: bgColor,
					height: `${height}px`,
					top: `${top}px`,
					...position,
				}}
				title={`${schedule.staff.name}: ${startDate.toLocaleTimeString()} - ${endDate.toLocaleTimeString()}`}
			>
				<div className="h-full w-full flex p-1 flex-col">
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
			</Button>
		</>
	);
}

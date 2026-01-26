import {
	type UpdateScheduleDto,
	useStaffScheduleActions,
} from "@novahair/client";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	Drawer,
	getInitial,
} from "@novahair/ui";
import { type TranslationKey, config } from "@novahair/utils";
import { t } from "i18next";
import { useState } from "react";
import { EditSchedule } from "./edit-schedule-dialog";
import type { Schedule } from "./weekly-calendar";

type ScheduleEventProps = {
	schedule: Schedule;
	index: number;
	schedules: Schedule[];
	colorMap: Record<string, string>;
	pixelsPerMinute: number;
	startHour: number;
};

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

export function ScheduleEvent({
	schedule,
	index,
	schedules,
	colorMap,
	pixelsPerMinute,
	startHour,
}: ScheduleEventProps) {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const { update } = useStaffScheduleActions(config.tenantId);

	const startMinutes = getMinutesFromMidnight(schedule.start);
	const endMinutes = getMinutesFromMidnight(schedule.end);
	const adjustedStart = startMinutes - startHour * 60;
	const adjustedEnd = endMinutes - startHour * 60;
	const top = Math.max(0, adjustedStart) * pixelsPerMinute;
	const height = Math.max(0, adjustedEnd - adjustedStart) * pixelsPerMinute;
	const position = getSchedulePosition(schedules, index);
	const bgColor = colorMap[schedule.staff] || "bg-foreground/20";

	return (
		<>
			<Drawer
				open={isDrawerOpen}
				onClose={() => setIsDrawerOpen(false)}
				title={
					t("[staff]_turn_at_[date]", {
						staff: schedule.staff,
						date: schedule.start,
					}) as TranslationKey
				}
			>
				<EditSchedule
					schedule={schedule}
					onSave={(updatedSchedule) => {
						setIsDrawerOpen(false);
						const schedule: UpdateScheduleDto = {
							id: updatedSchedule.id,
							startTime: updatedSchedule.start,
							endTime: updatedSchedule.end,
						};
						update.mutate({
							data: schedule,
							staffId: updatedSchedule.staff,
						});
					}}
					onClose={() => setIsDrawerOpen(false)}
				/>
			</Drawer>
			<Button
				className={
					"text-left absolute text-white p-1 border border-background rounded-lg text-sm overflow-hidden select-none cursor-pointer hover:opacity-80 transition-opacity font-normal"
				}
				style={{
					backgroundColor: bgColor,
					top: `${top}px`,
					height: `${height}px`,
					...position,
				}}
				title={`${schedule.staff}: ${schedule.start} - ${schedule.end}`}
				onClick={() => setIsDrawerOpen(true)}
			>
				<div className="h-full w-full flex p-2 flex-col">
					<div className="truncate flex items-center gap-2 mb-1">
						<Avatar className="size-6">
							<AvatarImage src={schedule.staff ?? ""} alt={t("image_url")} />
							<AvatarFallback>{getInitial(schedule.staff)}</AvatarFallback>
						</Avatar>
						<span className="">{schedule.staff}</span>
					</div>
					<div className="truncate text-xs">
						{schedule.start} - {schedule.end}
					</div>
				</div>
			</Button>
		</>
	);
}

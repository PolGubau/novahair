import {
	type UpdateScheduleDto,
	useScheduleActions,
} from "@novahair/client";
import { Avatar, Button, ConfirmDeleteDialog, Drawer, DrawerDescription } from "@novahair/ui";
import { Input } from "@novahair/ui/input";
import { combineDateTime, config, getTime, sizes } from "@novahair/utils";
import i18n from "@novahair/utils/i18n/setup";
import { useId, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Schedule } from "../weekly-calendar";

type EditScheduleProps = {
	schedule: Schedule;
	onSuccess: () => void;
	onClose: () => void;
	day: Date;
};

export function ScheduleDetails({
	schedule,
	onSuccess,
	onClose,
	day,
}: EditScheduleProps) {
	const { t } = useTranslation();
	const { update, remove } = useScheduleActions(config.tenantId);

	const { mutate, isPending } = update;
	const { mutate: deleteSchedule, isPending: isDeleting } = remove;
	const [editedSchedule, setEditedSchedule] = useState<Schedule | null>(
		schedule,
	);
	const endId = useId();

	if (!schedule || !editedSchedule) return null;

	const startDate = new Date(editedSchedule.start);
	const endDate = new Date(editedSchedule.end);
	// Use UTC to match backend timezone
	const startTime = `${startDate.getUTCHours().toString().padStart(2, "0")}:${startDate.getUTCMinutes().toString().padStart(2, "0")}`;
	const endTime = `${endDate.getUTCHours().toString().padStart(2, "0")}:${endDate.getUTCMinutes().toString().padStart(2, "0")}`;

	const handleSave = () => {
		if (editedSchedule) {
			updateSchedule(editedSchedule);
		}
 	};

	const handleDelete = () => {
		if (schedule) {
			deleteSchedule(schedule.id, { onSuccess });
		}
	};

	function updateSchedule(updatedSchedule: Schedule) {
		const schedule: UpdateScheduleDto = {
			endTime: updatedSchedule.end,
			id: updatedSchedule.id,
			startTime: updatedSchedule.start,
		};
		mutate({
			data: [schedule],
			staffId: updatedSchedule.staff.id,
		},{onSuccess});
	}

	 

	const [startFormattedTime] = getTime(schedule.start);
	const [endFormattedTime] = getTime(schedule.end);

	return (
		<div className="space-y-6">
			{/* Schedule Details */}
			<div className="space-y-2">
				<DrawerDescription>{t("schedule_details")}</DrawerDescription>
				<div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
					<Avatar
						alt={schedule.staff.name}
						size={sizes.md}
						src={schedule.staff.avatarUrl ?? ""}
					/>
					<div className="flex-1">
						<p className="font-semibold">{schedule.staff.name}</p>
						<p className="text-sm text-muted-foreground">
							{startFormattedTime} - {endFormattedTime}
						</p>
						<p className="text-xs text-muted-foreground mt-1 first-letter:capitalize">
							{startDate.toLocaleDateString(i18n.language, {
								weekday: 'long',
								year: 'numeric',
								month: 'long',
								day: 'numeric',
								timeZone: 'UTC'
							})}
						</p>
					</div>
				</div>
			</div>

			{/* Edit Form */}
			<div className="space-y-2">
				<DrawerDescription>{t("edit_schedule")}</DrawerDescription>
				<div className="grid grid-cols-2 gap-4">
					<Input
						label={t("start_hour")}
						onChange={(e) => {
							const time = e.target.value;
							setEditedSchedule({
								...editedSchedule,
								start: combineDateTime(day, time).iso,
							});
						}}
						type="time"
						value={startTime}
					/>
					<Input
						id={endId}
						label={t("end_hour")}
						onChange={(e) => {
							const time = e.target.value;
							setEditedSchedule({
								...editedSchedule,
								end: combineDateTime(day, time).iso,
							});
						}}
						type="time"
						value={endTime}
					/>
				</div>
 			</div>

			{/* Actions */}
			<footer className="flex justify-between gap-2 pt-4 border-t">
				
				<ConfirmDeleteDialog
 					onConfirm={handleDelete}
					triggerProps={{
						loading: isDeleting,
						disabled: isDeleting || isPending,
					}}
				/>
			 
				
				<div className="flex gap-2">
					<Button onClick={onClose} variant="outline" disabled={isDeleting || isPending}>
						{t("cancel")}
					</Button>
					<Button loading={isPending} onClick={handleSave} disabled={isDeleting || isPending}>
						{t("save")}
					</Button>
				</div>
			</footer>
		</div>
	);
}

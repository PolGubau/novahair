import {
	type UpdateScheduleDto,
	useScheduleActions,
} from "@novahair/client";
import { Button } from "@novahair/ui";
import { Input } from "@novahair/ui/input";
import { combineDateTime, config } from "@novahair/utils";
import { useId, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Schedule } from "../weekly-calendar";

type EditScheduleProps = {
	schedule: Schedule | null;
	onSuccess: () => void;
	onClose: () => void;
};

export function EditSchedule({
	schedule,
	onSuccess,
	onClose,
}: EditScheduleProps) {
	const { t } = useTranslation();
	const { update } = useScheduleActions(config.tenantId);

	const { mutate, isPending } = update;
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

	function updateSchedule(updatedSchedule: Schedule) {
		const schedule: UpdateScheduleDto = {
			endTime: updatedSchedule.end,
			id: updatedSchedule.id,
			startTime: updatedSchedule.start,
		};
		mutate({
			data: [schedule],
			staffId: updatedSchedule.staff.id,
		},{onSuccess: () => {
			onSuccess();
		}});
	}

	// Use the schedule's original date (in UTC) instead of the local 'day' prop
	// to avoid timezone issues when combining date and time
	const scheduleDate = new Date(editedSchedule.start);

	return (
		<div className="">
			<h2 className="text-lg font-semibold mb-4">{t("edit_schedule")}</h2>
			<div className="grid grid-cols-2 gap-4">
 					<Input
						label={t("start_hour")}
						onChange={(e) => {
							const time = e.target.value;
							setEditedSchedule({
								...editedSchedule,
								start: combineDateTime(scheduleDate, time).iso,
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
								end: combineDateTime(scheduleDate, time).iso,
							});
						}}
						type="time"
						value={endTime}
					/>
 			</div>
			<div className="flex justify-end gap-2 mt-6">
				<Button onClick={onClose} variant="outline">
					{t("cancel")}
				</Button>
				<Button loading={isPending} onClick={handleSave}>
					{t("save")}
				</Button>
			</div>
		</div>
	);
}

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
	day: Date;
};

export function EditSchedule({
	schedule,
	onSuccess,
	onClose,
	day,
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
		onSuccess();
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
		});
	}

	return (
		<div className="">
			<h2 className="text-lg font-semibold mb-4">{t("edit_schedule")}</h2>
			<div className="space-y-4">
				<div className="grid grid-cols-[1fr_3fr] gap-4 items-center">
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
				</div>
				<div className="grid grid-cols-[1fr_3fr] gap-4 items-center">
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

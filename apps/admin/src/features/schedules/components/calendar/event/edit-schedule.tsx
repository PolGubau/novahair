import {
	type UpdateScheduleDto,
	useStaffScheduleActions,
} from "@novahair/client";
import { Button } from "@novahair/ui";
import { Input } from "@novahair/ui/input";
import { Label } from "@novahair/ui/label";
import { combineDateTime, config } from "@novahair/utils";
import { t } from "i18next";
import { useState } from "react";
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
	const { update } = useStaffScheduleActions(config.tenantId);

	const { mutate, isPending } = update;
	const [editedSchedule, setEditedSchedule] = useState<Schedule | null>(
		schedule,
	);

	if (!schedule || !editedSchedule) return null;

	const startDate = new Date(editedSchedule.start);
	const endDate = new Date(editedSchedule.end);
	const startTime = `${startDate.getHours().toString().padStart(2, "0")}:${startDate.getMinutes().toString().padStart(2, "0")}`;
	const endTime = `${endDate.getHours().toString().padStart(2, "0")}:${endDate.getMinutes().toString().padStart(2, "0")}`;

	const handleSave = () => {
		if (editedSchedule) {
			updateSchedule(editedSchedule);
		}
		onSuccess();
	};

	function updateSchedule(updatedSchedule: Schedule) {
		const schedule: UpdateScheduleDto = {
			id: updatedSchedule.id,
			startTime: updatedSchedule.start,
			endTime: updatedSchedule.end,
		};
		mutate({
			data: [schedule],
			staffId: updatedSchedule.staff.id,
		});
	}

	return (
		<div className="">
			<h2 className="text-lg font-semibold mb-4">Editar Horario</h2>
			<div className="space-y-4">
				<div className="grid grid-cols-[1fr_3fr] gap-4 items-center">
					<Input
						label={t("start_hour")}
						type="time"
						value={startTime}
						onChange={(e) => {
							const time = e.target.value;
							setEditedSchedule({
								...editedSchedule,
								start: combineDateTime(day, time).iso,
							});
						}}
					/>
				</div>
				<div className="grid grid-cols-[1fr_3fr] gap-4 items-center">
 					<Input
						id="end"
						label={t("end_hour")}
						type="time"
						value={endTime}
						onChange={(e) => {
							const time = e.target.value;
							setEditedSchedule({
								...editedSchedule,
								end: combineDateTime(day, time).iso,
							});
						}}
					/>
				</div>
			</div>
			<div className="flex justify-end gap-2 mt-6">
				<Button variant="outline" onClick={onClose}>
					{t("cancel")}
				</Button>
				<Button onClick={handleSave} loading={isPending}>
					{t("save")}
				</Button>
			</div>
		</div>
	);
}

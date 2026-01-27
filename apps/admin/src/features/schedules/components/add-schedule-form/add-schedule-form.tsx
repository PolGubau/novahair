import {
	type CreateScheduleDto,
	type Staff,
	useStaffScheduleActions,
} from "@novahair/client";
import { Button } from "@novahair/ui";
import { combineDateTime, config } from "@novahair/utils";
import { t } from "i18next";
import { useState } from "react";
import { SelectedDaysArray } from "./selected-days-array";
import { StaffSelector } from "./staff-selector";
import { TimeSlotArray } from "./time-slot-array";

type Props = {
	onSuccess?: () => void;
	onCancel?: () => void;
	selectedDays: Date[];
	setSelectedDays: (dates: Date[]) => void;
};

export function AddScheduleForm({
	onSuccess,
	selectedDays,
	onCancel,
	setSelectedDays,
}: Props) {
	const { create } = useStaffScheduleActions(config.tenantId);
	const { mutate, isPending } = create;
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const newTimeSlots: CreateScheduleDto[] = selectedDays.flatMap((day) =>
			timeSlots.map((slot) => ({
				endTime: combineDateTime(day, slot.endTime).iso,
				startTime: combineDateTime(day, slot.startTime).iso,
			})),
		);

		for (const staff of selectedStaffs) {
			mutate(
				{
					data: newTimeSlots,
					staffId: staff.id,
				},
				{ onSuccess: onSuccess },
			);
		}
	};

	const [selectedStaffs, setSelectedStaffs] = useState<Staff[]>([]);
	const [timeSlots, setTimeSlots] = useState<CreateScheduleDto[]>([]);
	return (
		<form className="space-y-6" onSubmit={handleSubmit}>
			<SelectedDaysArray days={selectedDays} setDays={setSelectedDays} />
			<StaffSelector
				onChange={setSelectedStaffs}
				selectedStaffs={selectedStaffs}
			/>

			<TimeSlotArray setTimeSlots={setTimeSlots} timeSlots={timeSlots} />

			<nav className="flex justify-end gap-2 pt-4 border-t">
				<Button onClick={onCancel} variant="outline">
					{t("cancel")}
				</Button>
				<Button
					disabled={
						isPending ||
						!selectedStaffs.length ||
						!timeSlots.some((s) => s.startTime && s.endTime)
					}
					type="submit"
				>
					{t("assign_schedule")}
				</Button>
			</nav>
		</form>
	);
}

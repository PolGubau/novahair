import {
	type CreateScheduleDto,
	type Staff,
	useStaffScheduleActions,
} from "@novahair/client";
import { Button } from "@novahair/ui";
import { config } from "@novahair/utils";
import { t } from "i18next";
import { useState } from "react";
import type { TimeSlot } from "../schedule-assignment-drawer";
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
		const combineDateTime = (date: Date, time: string): Date => {
			const [hours, minutes] = time.split(":").map(Number);
			const newDate = new Date(date);
			newDate.setHours(hours, minutes, 0, 0);
			return newDate;
		};
		const newTimeSlots: CreateScheduleDto[] = selectedDays.flatMap((day) =>
			timeSlots.map((slot) => ({
				startTime: combineDateTime(day, slot.start).toISOString(),
				endTime: combineDateTime(day, slot.end).toISOString(),
			})),
		);

		for (const staff of selectedStaffs) {
			mutate(
				{
					staffId: staff.id,
					data: newTimeSlots,
				},
				{ onSuccess: onSuccess },
			);
		}
	};

	const [selectedStaffs, setSelectedStaffs] = useState<Staff[]>([]);
	const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
	return (
		<form className="space-y-6" onSubmit={handleSubmit}>
			<SelectedDaysArray days={selectedDays} setDays={setSelectedDays} />
			<StaffSelector
				selectedStaffs={selectedStaffs}
				onChange={setSelectedStaffs}
			/>

			<TimeSlotArray setTimeSlots={setTimeSlots} timeSlots={timeSlots} />

			<nav className="flex justify-end gap-2 pt-4 border-t">
				<Button onClick={onCancel} variant="outline">
					{t("cancel")}
				</Button>
				<Button
					type="submit"
					disabled={
						isPending ||
						!selectedStaffs.length ||
						!timeSlots.some((s) => s.start && s.end)
					}
				>
					{t("assign_schedule")}
				</Button>
			</nav>
		</form>
	);
}

import {
	useScheduleActions,
	type CreateScheduleDto,
	type Staff,
 } from "@novahair/client";
import { Button } from "@novahair/ui";
import { combineDateTime, config, type ISODate } from "@novahair/utils";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SelectedDaysArray } from "./selected-days-array";
import { StaffSelector } from "./staff-selector";
import { TimeSlotArray } from "./time-slot-array";

type TimeSlot = {
	startTime: ISODate;
	endTime: ISODate;
};

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
	const { t } = useTranslation();
	const { create } = useScheduleActions(config.tenantId);
	const { mutate, isPending } = create;
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Create all schedules for all selected staff in one array
		const allSchedules: CreateScheduleDto[] = selectedDays.flatMap((day) =>
			selectedStaffs.flatMap((staff) =>
				timeSlots.map((slot) => ({
					staffId: staff.id,
					endTime: combineDateTime(day, slot.endTime).iso,
					startTime: combineDateTime(day, slot.startTime).iso,
				}))
			)
		);

		// Single API call with all schedules
		mutate(allSchedules, { onSuccess });
	};

	const [selectedStaffs, setSelectedStaffs] = useState<Staff[]>([]);
	const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
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

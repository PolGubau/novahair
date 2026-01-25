import type { Staff } from "@novahair/client";
import { Button } from "@novahair/ui";
import i18n from "@novahair/utils/i18n/setup";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { TimeSlot } from "../ScheduleAssignmentDrawer";
import { SelectedDaysArray } from "./selected-days-array";
import { StaffSelector } from "./staff-selector";
import { TimeSlotArray } from "./time-slot-array";
import { t } from "i18next";

type Props = {
	onSuccess?: () => void;
	selectedDays: Date[];
	setSelectedDays: (dates: Date[]) => void;
};

export function AddScheduleForm({
	onSuccess,
	selectedDays,
	setSelectedDays,
}: Props) {
	const handleSubmit = () => {
		// Implement submission logic here
		onSuccess?.();
	};

	const [selectedStaffs, setSelectedStaffs] = useState<Staff[]>([]);
	const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
	return (
		<div className="space-y-6">
			<SelectedDaysArray days={selectedDays} setDays={setSelectedDays} />
			<StaffSelector
				selectedStaffs={selectedStaffs}
				onChange={setSelectedStaffs}
			/>

			<TimeSlotArray setTimeSlots={setTimeSlots} timeSlots={timeSlots} />

			<Button
				onClick={handleSubmit}
				disabled={
					!selectedStaffs.length || !timeSlots.some((s) => s.start && s.end)
				}
			>
				{t("assign_schedule")}
			</Button>
		</div>
	);
}

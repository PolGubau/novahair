import type { CreateScheduleDto } from "@novahair/client";
import { Button, Input } from "@novahair/ui";
import type { ISODate } from "@novahair/utils";
import { t } from "i18next";
import { Plus, X } from "lucide-react";

type Props = {
	timeSlots: CreateScheduleDto[];
	setTimeSlots: (slots: CreateScheduleDto[]) => void;
};
export const TimeSlotArray = ({ timeSlots, setTimeSlots }: Props) => {
	const addTimeSlot = () => {
		const slots: CreateScheduleDto[] = [...timeSlots];
		slots.push({
			startTime: undefined as unknown as ISODate,
			endTime: undefined as unknown as ISODate,
		});
		setTimeSlots(slots);
	};

	const removeTimeSlot = (index: number) => {
		setTimeSlots(timeSlots.filter((_, i) => i !== index));
	};

	const updateTimeSlot = (
		index: number,
		field: "startTime" | "endTime",
		value: string,
	) => {
		setTimeSlots(
			timeSlots.map((slot, i) =>
				i === index ? { ...slot, [field]: value } : slot,
			),
		);
	};
	return (
		<div>
			<h3 className="text-lg font-semibold mb-2">{t("time_slots")}</h3>
			<div className="space-y-2">
				{timeSlots.map((slot, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: key
					<div key={index} className="flex items-center space-x-2">
						<Input
							type="time"
							value={slot.startTime}
							onChange={(e) =>
								updateTimeSlot(index, "startTime", e.target.value)
							}
							placeholder={t("start")}
						/>
						<span>{t("to")}</span>
						<Input
							type="time"
							value={slot.endTime}
							onChange={(e) => updateTimeSlot(index, "endTime", e.target.value)}
							placeholder={t("end")}
						/>
						{timeSlots.length > 1 && (
							<Button
								variant="outline"
								size="sm"
								onClick={() => removeTimeSlot(index)}
							>
								<X className="h-4 w-4" />
							</Button>
						)}
					</div>
				))}
				<Button variant="outline" onClick={addTimeSlot}>
					<Plus className="h-4 w-4 mr-2" />
					{t("add_time_slot")}
				</Button>
			</div>
		</div>
	);
};

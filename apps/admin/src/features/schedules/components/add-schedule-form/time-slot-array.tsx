import type { CreateScheduleDto } from "@novahair/client";
import { Button, Input } from "@novahair/ui";
import type { ISODate } from "@novahair/utils";
import { useTranslation } from "react-i18next";
import { Plus, X } from "lucide-react";

type Props = {
	timeSlots: CreateScheduleDto[];
	setTimeSlots: (slots: CreateScheduleDto[]) => void;
};
export const TimeSlotArray = ({ timeSlots, setTimeSlots }: Props) => {
	const { t } = useTranslation();
	const addTimeSlot = () => {
		const slots: CreateScheduleDto[] = [...timeSlots];
		slots.push({
			endTime: undefined as unknown as ISODate,
			startTime: undefined as unknown as ISODate,
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
					<div className="flex items-center space-x-2" key={index}>
						<Input
							onChange={(e) =>
								updateTimeSlot(index, "startTime", e.target.value)
							}
							placeholder={t("start")}
							type="time"
							value={slot.startTime}
						/>
						<span>{t("to")}</span>
						<Input
							onChange={(e) => updateTimeSlot(index, "endTime", e.target.value)}
							placeholder={t("end")}
							type="time"
							value={slot.endTime}
						/>
						{timeSlots.length > 1 && (
							<Button
								onClick={() => removeTimeSlot(index)}
								size="sm"
								variant="outline"
							>
								<X className="h-4 w-4" />
							</Button>
						)}
					</div>
				))}
				<Button onClick={addTimeSlot} variant="outline">
					<Plus className="h-4 w-4 mr-2" />
					{t("add_time_slot")}
				</Button>
			</div>
		</div>
	);
};

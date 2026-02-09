import { Button, Input } from "@novahair/ui";
import { type ISODate, sizes } from "@novahair/utils";
import { Plus, X } from "lucide-react";
import { useTranslation } from "react-i18next";

type TimeSlot = {
	startTime: ISODate;
	endTime: ISODate;
};

type Props = {
	timeSlots: TimeSlot[];
	setTimeSlots: (slots: TimeSlot[]) => void;
};

export const TimeSlotArray = ({ timeSlots, setTimeSlots }: Props) => {
	const { t } = useTranslation();
	const addTimeSlot = () => {
		const slots: TimeSlot[] = [...timeSlots];
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
								size={sizes.sm}
								variant="outline"
							>
								<X   />
							</Button>
						)}
					</div>
				))}
				<Button onClick={addTimeSlot} variant="outline">
					<Plus />
					{t("add_time_slot")}
				</Button>
			</div>
		</div>
	);
};

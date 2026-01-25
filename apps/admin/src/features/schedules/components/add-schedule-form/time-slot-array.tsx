import { Button, Input } from "@novahair/ui";
import { Plus, X } from "lucide-react";
import type { TimeSlot } from "../schedule-assignment-drawer";

type Props = {
	timeSlots: TimeSlot[];
	setTimeSlots: (slots: TimeSlot[]) => void;
};
export const TimeSlotArray = ({ timeSlots, setTimeSlots }: Props) => {
	const addTimeSlot = () => {
		setTimeSlots([...timeSlots, { start: "", end: "" }]);
	};

	const removeTimeSlot = (index: number) => {
		setTimeSlots(timeSlots.filter((_, i) => i !== index));
	};

	const updateTimeSlot = (
		index: number,
		field: "start" | "end",
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
			<h3 className="text-lg font-semibold mb-2">Horarios</h3>
			<div className="space-y-2">
				{timeSlots.map((slot, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: key
					<div key={index} className="flex items-center space-x-2">
						<Input
							type="time"
							value={slot.start}
							onChange={(e) => updateTimeSlot(index, "start", e.target.value)}
							placeholder="Inicio"
						/>
						<span>a</span>
						<Input
							type="time"
							value={slot.end}
							onChange={(e) => updateTimeSlot(index, "end", e.target.value)}
							placeholder="Fin"
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
					Agregar Horario
				</Button>
			</div>
		</div>
	);
};

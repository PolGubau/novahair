import { Button, Input } from "@novahair/ui";
import { Plus, X } from "lucide-react";
export function formatDate(date: Date, locale = "en-US") {
	return new Intl.DateTimeFormat(locale, {
		month: "long",
		day: "numeric",
		weekday: "long",
	}).format(date);
}
type Props = {
	days: Date[];
	setDays: (dates: Date[]) => void;
};
export const SelectedDaysArray = ({ days, setDays }: Props) => {
	const addTimeSlot = () => {
		setDays([...days, new Date()]);
	};

	const removeTimeSlot = (index: number) => {
		setDays(days.filter((_, i) => i !== index));
	};

	const updateDay = (index: number, newDate: Date) => {
		setDays(days.map((day, i) => (i === index ? newDate : day)));
	};
	return (
		<div>
			<h3 className="text-lg font-semibold mb-2">Días Seleccionados</h3>
			<div className="space-y-2">
				{days.map((slot, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: key
					<div key={index} className="flex items-center space-x-2">
						<Input
							type="date"
							value={slot.toISOString().split("T")[0]}
							onChange={(e) => updateDay(index, new Date(e.target.value))}
							placeholder="Inicio"
						/>

						{days.length > 1 && (
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

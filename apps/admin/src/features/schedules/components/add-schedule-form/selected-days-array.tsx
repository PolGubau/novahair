import { Button, Input } from "@novahair/ui";
import { sizes } from "@novahair/utils";
import { Plus, X } from "lucide-react";
import { useTranslation } from "react-i18next";
export function formatDate(date: Date, locale = "en-US") {
	return new Intl.DateTimeFormat(locale, {
		day: "numeric",
		month: "long",
		weekday: "long",
	}).format(date);
}
type Props = {
	days: Date[];
	setDays: (dates: Date[]) => void;
};
export const SelectedDaysArray = ({ days, setDays }: Props) => {
	const { t } = useTranslation();
	const addDay = () => {
		let newDate: Date;
		if (days.length > 0) {
			// Tomar el último día y añadir un día
			const lastDay = days[days.length - 1];
			newDate = new Date(lastDay.getTime() + 24 * 60 * 60 * 1000); // Añadir un día
		} else {
			// Usar hoy
			newDate = new Date();
		}
		setDays([...days, newDate]);
	};

	const removeDay = (index: number) => {
		setDays(days.filter((_, i) => i !== index));
	};

	const updateDay = (index: number, newDate: Date) => {
		setDays(days.map((day, i) => (i === index ? newDate : day)));
	};
	return (
		<div>
			<h3 className="text-lg font-semibold mb-2">{t("selected_days")}</h3>
			<div className="space-y-2">
				{days.map((slot, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: key
					<div className="flex items-center space-x-2" key={index}>
						<Input
							onChange={(e) => updateDay(index, new Date(e.target.value))}
							placeholder="Inicio"
							type="date"
							value={slot.toISOString().split("T")[0]}
						/>

						{days.length > 1 && (
							<Button
								onClick={() => removeDay(index)}
								size={sizes.sm}
								variant="outline"
							>
								<X className="h-4 w-4" />
							</Button>
						)}
					</div>
				))}
				<Button onClick={addDay} variant="outline">
					<Plus />
					{t("add_schedules")}
				</Button>
			</div>
		</div>
	);
};

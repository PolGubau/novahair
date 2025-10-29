import { t } from "i18next";
import { Route } from "~/routes/book/$serviceId";
import { Button } from "~/shared/ui/button";
import { LoadingOverlay } from "~/shared/ui/loading-overlay";
import { useSlots } from "../../model/use-slots";

export type SlotShort = {
	start: string;
	end: string;
};
type SlotChooserProps = {
	date: Date;
	staffId?: string;
	selectedSlot?: SlotShort;
	onChange: (slot: SlotShort) => void;
};
export const SlotChooser = ({
	date,
	staffId,
	selectedSlot,
	onChange,
}: SlotChooserProps) => {
	const serviceId = Route.useParams().serviceId;

	const { isLoading, error, slots } = useSlots({
		serviceId,
		currentDate: date,
		staffId,
	});
	return (
		<LoadingOverlay isLoading={isLoading}>
			<p
				className="block mb-1 text-sm font-medium text-foreground"
				data-slot="label"
			>
				{t("choose_time_slot")}
			</p>

			<ul className="overflow-x-auto gap-2 grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))]">
				{slots.map((slot) => {
					const isSelected = selectedSlot?.start === slot.start;
					return (
						<li key={slot.start} className="border-b last:border-0">
							<Button
								variant={isSelected ? "default" : "outline"}
								className="w-full"
								type="button"
								onClick={() => onChange({ start: slot.start, end: slot.end })}
								data-active={isSelected}
								aria-pressed={isSelected}
							>
								{new Date(slot.start).toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit",
								})}
								-
								{new Date(slot.end).toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit",
								})}
							</Button>
						</li>
					);
				})}
			</ul>
		</LoadingOverlay>
	);
};

import type { Slot } from "~/features/appointment-form/domain/slot";
import { Button } from "~/shared/ui/button";

type Props = {
	slot: Slot;
	isSelected: boolean;
	onSelect: () => void;
};
export const SlotItem = ({ slot, isSelected, onSelect }: Props) => {
	return (
		<li className="border-b last:border-0">
			<Button
				variant={isSelected ? "default" : "outline"}
				className="w-full"
				type="button"
				onClick={onSelect}
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
};

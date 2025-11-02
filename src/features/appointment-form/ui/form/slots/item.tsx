import type { Slot } from "~/features/appointment-form/domain/slot";
import { Button } from "~/shared/ui/button";

type Props = {
	slot: Slot;
	isSelected: boolean;
	onSelect: () => void;
};
export const SlotItem = ({ slot, isSelected, onSelect }: Props) => {
	const format = Intl.DateTimeFormat([], {
		hour: "2-digit",
		minute: "2-digit",
	});

	const startTime = format.format(new Date(slot.start));
	const endTime = format.format(new Date(slot.end));

	return (
		<li className="border-b last:border-0">
			<Button
				variant={isSelected ? "default" : "outline"}
				className="w-full gap-1"
				type="button"
				onClick={onSelect}
				data-active={isSelected}
				aria-pressed={isSelected}
			>
				<span>{startTime}</span>
				<span>-</span>
				<span>{endTime}</span>
			</Button>
		</li>
	);
};

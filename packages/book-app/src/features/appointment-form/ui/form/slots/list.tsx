import type { AvailabilitySlot } from "@novahair/client";
import { SlotItem } from "./item";

type Props = {
	slots: AvailabilitySlot[];
	selectedSlot: AvailabilitySlot | null;
	onChange: (slot: AvailabilitySlot) => void;
};
export const SlotList = ({ slots, selectedSlot, onChange }: Props) => {
	return (
		<ul className={slotsListClassNames.list}>
			{slots.map((slot) => {
				const isSelected = selectedSlot?.start === slot.start;
				return (
					<SlotItem
						key={slot.start}
						slot={slot}
						isSelected={isSelected}
						onSelect={() => onChange(slot)}
					/>
				);
			})}
		</ul>
	);
};

export const slotsListClassNames = {
	list: "overflow-x-auto gap-2 grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] max-h-[40vh]",
};

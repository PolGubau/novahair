import { SlotItemSkeleton } from "./item-skeleton";
import { slotsListClassNames } from "./list";

export const SlotListSkeleton = ({ count = 14 }: { count?: number }) => {
	return (
		<ul className={slotsListClassNames.list}>
			{Array.from({ length: count }, (_, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: its ok
				<SlotItemSkeleton key={index} />
			))}
		</ul>
	);
};

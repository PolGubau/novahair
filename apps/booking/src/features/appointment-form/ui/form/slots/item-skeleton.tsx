import { Button } from "@novahair/ui/button";

export const SlotItemSkeleton = () => {
	return (
		<li>
			<Button variant={"outline"} className="w-full" type="button">
				<span className="skeleton">lorem</span>
				{`-`}
				<span className="skeleton">ipsum</span>
			</Button>
		</li>
	);
};

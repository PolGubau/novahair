import { Button } from "~/shared/ui/button";

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

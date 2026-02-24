import { Skeleton } from "@novahair/ui/skeleton";

export const ServiceItemSkeleton = () => {
	return (
		<li className="rounded-2xl overflow-hidden bg-foreground/3 gap-1 md:gap-4 grid grid-cols-[1fr_2fr] items-center">
			<Skeleton className="w-full h-44" />
			<div className="p-2 md:py-4 gap-2 flex flex-col h-full justify-between">
				<header className="flex flex-col gap-1">
					<Skeleton className="h-8 w-3/4" />
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-2/3" />
				</header>
				<Skeleton className="h-10 w-40" />
			</div>
		</li>
	);
};


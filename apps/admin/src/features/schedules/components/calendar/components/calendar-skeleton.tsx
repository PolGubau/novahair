import { Skeleton } from "@novahair/ui";

interface CalendarSkeletonProps {
	weekDays: Date[];
}

export function CalendarSkeleton({ weekDays }: CalendarSkeletonProps) {
	return (
		<ul className="flex w-full overflow-x-auto h-full gap-0 border rounded-xl divide-x divide-foreground/5">
			{weekDays.map((day) => (
				<li
					key={day.toISOString()}
					className="flex-1 min-w-36 overflow-hidden h-full min-h-150"
				>
					<Skeleton className="h-10 w-full rounded-none" />
					<div className="border-t">
						<Skeleton className="h-full w-full" />
					</div>
				</li>
			))}
		</ul>
	);
}

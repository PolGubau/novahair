import { Button, IconButton } from "@novahair/ui";
import { addDays, format, startOfWeek } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface WeekNavigationProps {
	currentWeekStart: Date;
	setCurrentWeekStart: (date: Date) => void;
}

export function WeekNavigation({
	currentWeekStart,
	setCurrentWeekStart,
}: WeekNavigationProps) {
	return (
		<div className="flex justify-between items-center space-x-4 mb-2">
			<span className="text-lg font-medium">
				{format(currentWeekStart, "MMM yyyy")}
			</span>
			<div className="flex gap-1">
				<Button
					onClick={() =>
						setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }))
					}
					variant="outline"
				>
					Hoy
				</Button>
				<IconButton
					icon={<ChevronLeft />}
					onClick={() => setCurrentWeekStart(addDays(currentWeekStart, -7))}
					variant="outline"
				/>
				<IconButton
					icon={<ChevronRight />}
					onClick={() => setCurrentWeekStart(addDays(currentWeekStart, 7))}
					variant="outline"
				/>
			</div>
		</div>
	);
}

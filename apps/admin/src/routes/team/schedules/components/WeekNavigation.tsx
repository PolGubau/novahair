import { Button } from "@novahair/ui";
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
		<div className="flex justify-center items-center space-x-4 mb-4">
			<Button
				variant="outline"
				onClick={() => setCurrentWeekStart(addDays(currentWeekStart, -7))}
			>
				<ChevronLeft className="h-4 w-4" />
			</Button>
			<span className="text-lg font-medium">
				{format(currentWeekStart, "MMM yyyy")}
			</span>
			<Button
				variant="outline"
				onClick={() => setCurrentWeekStart(addDays(currentWeekStart, 7))}
			>
				<ChevronRight className="h-4 w-4" />
			</Button>
			<Button
				variant="outline"
				onClick={() =>
					setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }))
				}
			>
				Hoy
			</Button>
		</div>
	);
}

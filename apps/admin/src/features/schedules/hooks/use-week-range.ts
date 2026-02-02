import { type ISODate } from "@novahair/utils";
import { addDays, endOfDay, startOfWeek } from "date-fns";
import { useMemo, useState } from "react";

export function useWeekRange() {
	const [currentWeekStart, setCurrentWeekStart] = useState(
		startOfWeek(new Date(), { weekStartsOn: 1 }),
	);

	const { from, to } = useMemo(() => {
		const weekEnd = endOfDay(addDays(currentWeekStart, 6));
		return {
			from: currentWeekStart.toISOString() as ISODate,
			to: weekEnd.toISOString() as ISODate,
		};
	}, [currentWeekStart]);

	const weekDays = useMemo(
		() => Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i)),
		[currentWeekStart],
	);

	return { currentWeekStart, setCurrentWeekStart, weekDays, from, to };
}

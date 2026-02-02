import type { Staff } from "@novahair/client";
import type { ISODate } from "@novahair/utils";
import { CalendarDay } from "./calendar-day";
import { CalendarSkeleton } from "./components/calendar-skeleton";
import { useCalendarSizing } from "./hooks/use-calendar-sizing";

export interface Schedule {
	id: string;
	staff: Staff;
	start: ISODate;
	end: ISODate;
}

interface WeeklyCalendarProps {
	weekDays: Date[];
	selectedDates: Date[];
	startHour: number;
	endHour: number;
	toggleDate: (date: Date) => void;
	getSchedulesForDay: (date: Date) => Schedule[];
	isLoading: boolean;
	staffs: Staff[];
}

export function WeeklyCalendar({
	weekDays,
	selectedDates,
	toggleDate,
	getSchedulesForDay,
	isLoading,
	endHour,
	startHour,
}: WeeklyCalendarProps) {
	const { height: DAY_HEIGHT, pixelsPerMinute: PIXELS_PER_MINUTE } =
		useCalendarSizing(endHour - startHour);

	if (isLoading) {
		return <CalendarSkeleton weekDays={weekDays} />;
	}

	return (
		<ul className="flex w-full overflow-x-auto gap-0 border rounded-xl divide-x divide-foreground/5">
 			{weekDays.map((day) => (
				<CalendarDay
					day={day}
					dayHeight={DAY_HEIGHT}
					endHour={endHour}
					isFirstDay={weekDays.indexOf(day) === 0}
					isLoading={isLoading}
					key={day.toISOString()}
					pixelsPerMinute={PIXELS_PER_MINUTE}
					schedules={getSchedulesForDay(day)}
					selectedDates={selectedDates}
					startHour={startHour}
					toggleDate={toggleDate}
				/>
			))}
		</ul>
	);
}

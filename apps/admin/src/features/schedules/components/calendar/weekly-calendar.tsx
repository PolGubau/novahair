import type { Staff } from "@novahair/client";
import type { ISODate } from "@novahair/utils";
import { useEffect, useState } from "react";
import { CalendarDay } from "./calendar-day";

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

// Hook para calcular height disponible y pixels por minuto
function useCalendarSizing(end: number) {
	const [dimensions, setDimensions] = useState({
		height: 400, // fallback mínimo
		pixelsPerMinute: 0.5,
	});

	useEffect(() => {
		const calculateDimensions = (end: number) => {
			// Estimar height disponible (viewport - header/footer aproximado)
			const windowHeight = window.innerHeight;
			const estimatedHeaderFooter = 220; // px aproximados para header, footer, padding
			const availableHeight = Math.max(
				100,
				windowHeight - estimatedHeaderFooter,
			);

			// Calcular pixels por minuto para ocupar todo el height disponible
			const totalMinutes = end * 60;
			const pixelsPerMinute = availableHeight / totalMinutes;

			setDimensions({
				height: availableHeight,
				pixelsPerMinute: Math.max(0.3, Math.min(1.5, pixelsPerMinute)), // límites razonables
			});
		};

		calculateDimensions(end);
		window.addEventListener("resize", () => calculateDimensions(end));
		return () =>
			window.removeEventListener("resize", () => calculateDimensions(end));
	}, [end]);

	return dimensions;
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

	return (
		<>
			<ul className="flex w-full overflow-x-auto gap-0 border rounded-xl divide-x divide-foreground/5">
				{weekDays.map((day) => (
					<CalendarDay
						endHour={endHour}
						startHour={startHour}
						key={day.toISOString()}
						day={day}
						schedules={getSchedulesForDay(day)}
						selectedDates={selectedDates}
						toggleDate={toggleDate}
						isLoading={isLoading}
						dayHeight={DAY_HEIGHT}
						pixelsPerMinute={PIXELS_PER_MINUTE}
						isFirstDay={weekDays.indexOf(day) === 0}
					/>
				))}
			</ul>
		</>
	);
}

import type { Staff } from "@novahair/client";
import { useEffect, useState } from "react";
import { CalendarDay } from "./calendar-day";
import { EditSchedule } from "./edit-schedule-dialog";

export interface Schedule {
	id: string;
	staff: string;
	start: string;
	end: string;
}

interface WeeklyCalendarProps {
	weekDays: Date[];
	selectedDates: Date[];
	startHour: number;
	endHour: number;
	toggleDate: (date: Date) => void;
	getSchedulesForDay: (date: Date) => Schedule[];
	isLoading: boolean;
	colorMap: Record<string, string>;
	staffs: Staff[];
	onScheduleUpdate?: (updatedSchedule: Schedule) => void;
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
	colorMap,
	endHour,
	startHour,
	onScheduleUpdate,
}: WeeklyCalendarProps) {
	const { height: DAY_HEIGHT, pixelsPerMinute: PIXELS_PER_MINUTE } =
		useCalendarSizing(endHour - startHour);
	const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);

	const handleEditSchedule = (schedule: Schedule) => {
		setEditingSchedule(schedule);
	};

	const handleSaveSchedule = (updatedSchedule: Schedule) => {
		// Aquí iría la lógica para guardar el horario actualizado
		// Por ahora, solo llamamos al callback si existe
		onScheduleUpdate?.(updatedSchedule);
		setEditingSchedule(null);
	};

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
						colorMap={colorMap}
						dayHeight={DAY_HEIGHT}
						pixelsPerMinute={PIXELS_PER_MINUTE}
						isFirstDay={weekDays.indexOf(day) === 0}
						onEditSchedule={handleEditSchedule}
					/>
				))}
			</ul>
			<EditSchedule
				schedule={editingSchedule}
				onSave={handleSaveSchedule}
				onClose={() => setEditingSchedule(null)}
			/>
		</>
	);
}

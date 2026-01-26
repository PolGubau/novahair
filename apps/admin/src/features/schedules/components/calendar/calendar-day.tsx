import { Button } from "@novahair/ui";
import i18n from "@novahair/utils/i18n/setup";
import { isSameDay } from "date-fns";
import { HourLines } from "./hour-lines";
import { ScheduleEvent } from "./schedule-event";
import type { Schedule } from "./weekly-calendar";

type CalendarDayProps = {
	day: Date;
	schedules: Schedule[];
	selectedDates: Date[];
	toggleDate: (date: Date) => void;
	isLoading: boolean;
	colorMap: Record<string, string>;
	dayHeight: number;
	pixelsPerMinute: number;
	isFirstDay: boolean;
	onEditSchedule: (schedule: Schedule) => void;
	startHour: number;
	endHour: number;
};

function weekDayLabel(date: Date, locale = "en-US") {
	return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(date);
}

function dayLabel(date: Date, locale = "en-US") {
	return new Intl.DateTimeFormat(locale, {
		day: "numeric",
	}).format(date);
}

export function CalendarDay({
	day,
	schedules,
	selectedDates,
	toggleDate,
	isLoading,
	colorMap,
	dayHeight,
	pixelsPerMinute,
	isFirstDay,
	startHour,
	endHour
}: CalendarDayProps) {
	return (
		<li
			className={`flex-1 min-w-36 overflow-hidden ${isFirstDay ? "pl-10" : ""} ${isSameDay(day, new Date()) ? "bg-foreground/5" : ""}`}
			style={{ height: `${dayHeight + 40}px` }}
			data-day={day.toISOString()}
		>
			<Button
				data-selected={selectedDates.some((d) => isSameDay(d, day))}
				className="p-2 rounded-none h-fit flex flex-col w-full data-[selected=true]:bg-primary/20 border-none"
				variant="ghost"
				size="sm"
				onClick={() => toggleDate(day)}
			>
				<span className="text-sm text-foreground/60 capitalize">
					{weekDayLabel(day, i18n.language)}
				</span>
				<h2 className="font-semibold capitalize">
					{dayLabel(day, i18n.language)}
				</h2>
			</Button>
			<div className="relative border-t" style={{ height: `${dayHeight}px` }}>
				<HourLines
					hoursCount={endHour - startHour}
					startHour={startHour}
					pixelsPerMinute={pixelsPerMinute}
					isFirstDay={isFirstDay}
				/>
				{isLoading ? (
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
					</div>
				) : (
					schedules.map((schedule, index) => (
						<ScheduleEvent
							key={`${schedule.staff}-${schedule.start}-${schedule.end}-${index}`}
							schedule={schedule}
							index={index}
							schedules={schedules}
							colorMap={colorMap}
							pixelsPerMinute={pixelsPerMinute}
							startHour={8}
						/>
					))
				)}
			</div>
		</li>
	);
}

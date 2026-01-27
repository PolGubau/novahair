import { Button, Loader } from "@novahair/ui";
import i18n from "@novahair/utils/i18n/setup";
import { isSameDay } from "date-fns";
import { ScheduleEvent } from "./event/schedule-event";
import { HourLines } from "./hour-lines";
import type { Schedule } from "./weekly-calendar";

type CalendarDayProps = {
	day: Date;
	schedules: Schedule[];
	selectedDates: Date[];
	toggleDate: (date: Date) => void;
	isLoading: boolean;
	dayHeight: number;
	pixelsPerMinute: number;
	isFirstDay: boolean;
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
	dayHeight,
	pixelsPerMinute,
	isFirstDay,
	startHour,
	endHour,
}: CalendarDayProps) {
	return (
		<li
			className={`flex-1 min-w-36 overflow-hidden ${isFirstDay ? "pl-10" : ""} ${isSameDay(day, new Date()) ? "bg-foreground/5" : ""}`}
			data-day={day.toISOString()}
			style={{ height: `${dayHeight + 40}px` }}
		>
			<Button
				className="p-2 rounded-none h-fit flex flex-col w-full data-[selected=true]:bg-primary/20 border-none"
				data-selected={selectedDates.some((d) => isSameDay(d, day))}
				onClick={() => toggleDate(day)}
				size="sm"
				variant="ghost"
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
					isFirstDay={isFirstDay}
					pixelsPerMinute={pixelsPerMinute}
					startHour={startHour}
				/>
				{isLoading ? (
					<div className="absolute inset-0 flex items-center justify-center">
						<Loader />
					</div>
				) : (
					schedules.map((schedule, index) => (
						<ScheduleEvent
							day={day}
							index={index}
							key={`${schedule.staff.name}-${schedule.start}-${schedule.end}-${index}`}
							pixelsPerMinute={pixelsPerMinute}
							schedule={schedule}
							schedules={schedules}
							startHour={startHour}
						/>
					))
				)}
			</div>
		</li>
	);
}

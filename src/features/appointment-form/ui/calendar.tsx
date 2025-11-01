/** biome-ignore-all lint/suspicious/noArrayIndexKey: Lo necesitamos */
import { generateCalendarMatrix } from "~/lib/calendar";
import { cn } from "~/lib/cn";
import { getWeekdayNames } from "~/lib/get-weekday-names";
import type { AvailableDay } from "../domain/available-day";

function getOnlyDate(date: Date) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isThisDayAvailable(date: Date, availableDays: AvailableDay[]) {
	// 1. search that day in availableDays
	// 2. check the isAvailable property
	const targetDate = getOnlyDate(date);
	return availableDays.some(({ date: availableDate, available }) => {
		const availableDayDate = getOnlyDate(new Date(availableDate));
		return availableDayDate.getTime() === targetDate.getTime() && available;
	});
}

type CalendarProps = {
	month: number;
	year: number;
	onSelectDate: (date: Date) => void;
	availableDays: AvailableDay[];
};
export const Calendar = ({
	onSelectDate,
	month,
	year,
	availableDays,
}: CalendarProps) => {
	const matrix = generateCalendarMatrix(year, month);
	const weekDays = getWeekdayNames();
	const today = new Date();
	return (
		<div className="w-full h-full p-4 md:p-14 rounded-lg">
			<table
				className="w-full h-full border-collapse table-fixed text-sm"
				cellPadding={0}
				cellSpacing={0}
			>
				<thead>
					<tr>
						{weekDays.map((dayName) => (
							<th key={dayName.long} className="pt-2 pb-6">
								<span className="md:hidden first-letter:capitalize">
									{dayName.short}
								</span>
								<span className="max-md:hidden first-letter:capitalize">
									{dayName.long}
								</span>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{matrix.map((week, weekIndex) => (
						<tr key={weekIndex}>
							{week.map((cell, dayIndex) => {
								const isToday =
									today.toDateString() === cell.date?.toDateString();
								const isAvailable =
									cell.date && isThisDayAvailable(cell.date, availableDays);
								return (
									<td key={dayIndex} className="w-[14%]">
										<button
											disabled={!isAvailable}
											type="button"
											className={cn("border p-3 w-full text-center min-h-24", {
												"border-transparent": !cell.inMonth,
												"border-foreground/5": cell.inMonth,
												"font-bold bg-amber-500/10": isToday,
												"bg-primary/10 ": isAvailable,
											})}
											onClick={() =>
												isAvailable && cell.date && onSelectDate?.(cell.date)
											}
										>
											{cell.day}
										</button>
									</td>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

import { type ISODate, toISODate } from "@novahair/utils";

type MonthBoundaries = {
	/** First day of the month (UTC) */
	start: Date;
	/** Last day of the month (UTC) */
	end: Date;
	startIso: ISODate;
	endIso: ISODate;
};

/**
 * Returns the UTC start and end dates of the month for the given date.
 * Always safe to use with .toISOString() (no timezone shifts)
 */
export const getMonthBoundaries = (date: Date): MonthBoundaries => {
	// Use the calendar month/year of the provided Date (local month). This
	// aligns with how the rest of the app constructs month dates (e.g. using
	// `new Date(year, month, 1)`) and avoids off-by-one issues when the
	// runtime timezone shifts the UTC month.
	const year = date.getFullYear();
	const month = date.getMonth();

	// Create UTC timestamps for the start (00:00 UTC of the first day) and
	// end (23:59:59.999 UTC of the last day) of that calendar month.
	const start = new Date(Date.UTC(year, month, 1, 0, 0, 0, 0));
	// Start of next month in UTC minus 1 ms
	const end = new Date(Date.UTC(year, month + 1, 1, 0, 0, 0, 0) - 1);

	const startIso = toISODate(start);
	const endIso = toISODate(end);
	return { start, end, startIso, endIso };
};

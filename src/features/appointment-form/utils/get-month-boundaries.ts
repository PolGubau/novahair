type MonthBoundaries = {
	/** First day of the month (UTC) */
	start: Date;
	/** Last day of the month (UTC) */
	end: Date;
};

/**
 * Returns the UTC start and end dates of the month for the given date.
 * Always safe to use with .toISOString() (no timezone shifts)
 */
export const getMonthBoundaries = (date: Date): MonthBoundaries => {
	const year = date.getUTCFullYear();
	const month = date.getUTCMonth();

	const start = new Date(Date.UTC(year, month, 1, 0, 0, 0));
	const end = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59, 999));

	return { start, end };
};

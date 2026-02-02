/**
 * Date Range Calculator
 * 
 * Utility functions to calculate date ranges for different time periods
 */

import { toISODate, type ISODate } from "@novahair/utils";
import {
	startOfDay,
	endOfDay,
	startOfWeek,
	endOfWeek,
	startOfMonth,
	endOfMonth,
	startOfQuarter,
	endOfQuarter,
	startOfYear,
	endOfYear,
	subDays,
	subWeeks,
	subMonths,
	subQuarters,
	subYears,
} from "date-fns";
import type { DateRange, TimePeriod } from "../domain/metrics";

/**
 * Calculates date range for a given time period
 */
export const getDateRangeForPeriod = (period: TimePeriod): DateRange => {
	const now = new Date();

	switch (period) {
		case "today":
			return {
				from: toISODate(startOfDay(now)),
				to: toISODate(endOfDay(now)),
			};

		case "week":
			return {
				from: toISODate(startOfWeek(now, { weekStartsOn: 1 })),
				to: toISODate(endOfWeek(now, { weekStartsOn: 1 })),
			};

		case "month":
			return {
				from: toISODate(startOfMonth(now)),
				to: toISODate(endOfMonth(now)),
			};

		case "quarter":
			return {
				from: toISODate(startOfQuarter(now)),
				to: toISODate(endOfQuarter(now)),
			};

		case "year":
			return {
				from: toISODate(startOfYear(now)),
				to: toISODate(endOfYear(now)),
			};

		default:
			// Default to current week
			return {
				from: toISODate(startOfWeek(now, { weekStartsOn: 1 })),
				to: toISODate(endOfWeek(now, { weekStartsOn: 1 })),
			};
	}
};

/**
 * Calculates the previous period's date range for comparison
 */
export const getPreviousPeriodRange = (
	period: TimePeriod,
	currentRange: DateRange,
): DateRange => {
	const start = new Date(currentRange.from);

	switch (period) {
		case "today": {
			const prevDay = subDays(start, 1);
			return {
				from: toISODate(startOfDay(prevDay)),
				to: toISODate(endOfDay(prevDay)),
			};
		}

		case "week": {
			const prevWeekStart = subWeeks(start, 1);
			return {
				from: toISODate(startOfWeek(prevWeekStart, { weekStartsOn: 1 })),
				to: toISODate(endOfWeek(prevWeekStart, { weekStartsOn: 1 })),
			};
		}

		case "month": {
			const prevMonthStart = subMonths(start, 1);
			return {
				from: toISODate(startOfMonth(prevMonthStart)),
				to: toISODate(endOfMonth(prevMonthStart)),
			};
		}

		case "quarter": {
			const prevQuarterStart = subQuarters(start, 1);
			return {
				from: toISODate(startOfQuarter(prevQuarterStart)),
				to: toISODate(endOfQuarter(prevQuarterStart)),
			};
		}

		case "year": {
			const prevYearStart = subYears(start, 1);
			return {
				from: toISODate(startOfYear(prevYearStart)),
				to: toISODate(endOfYear(prevYearStart)),
			};
		}

		default: {
			// Default to previous week
			const prevWeekStart = subWeeks(start, 1);
			return {
				from: toISODate(startOfWeek(prevWeekStart, { weekStartsOn: 1 })),
				to: toISODate(endOfWeek(prevWeekStart, { weekStartsOn: 1 })),
			};
		}
	}
};

/**
 * Creates a custom date range
 */
export const createCustomRange = (from: Date, to: Date): DateRange => {
	return {
		from: toISODate(startOfDay(from)),
		to: toISODate(endOfDay(to)),
	};
};


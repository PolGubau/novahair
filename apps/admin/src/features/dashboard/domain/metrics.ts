/**
 * Dashboard Domain Layer
 * 
 * This file contains the core business models and types for dashboard metrics.
 * Following Clean Architecture principles, this layer is independent of frameworks
 * and external dependencies.
 */

import type { ISODate, TranslationKey } from "@novahair/utils";

/**
 * Represents a Key Performance Indicator with current value and trend
 */
export interface KPI {
	/** Unique identifier for the KPI */
	id: string;
	/** Display label */
	label: TranslationKey;
	/** Current value */
	value: number;
	/** Previous period value for comparison */
	previousValue: number;
	/** Formatted display value (e.g., "$1,234", "45%") */
	formattedValue: string;
	/** Unit of measurement */
	unit: "currency" | "count" | "percentage" | "duration";
	/** Percentage change from previous period */
	changePercentage: number;
	/** Whether the trend is positive (up is good) */
	isPositiveTrend: boolean;
}

/**
 * Time series data point for charts
 */
export interface DataPoint {
	/** Date of the data point */
	date: ISODate;
	/** Numeric value */
	value: number;
	/** Optional label for display */
	label?: string;
}

/**
 * Trend data for a specific metric over time
 */
export interface TrendData {
	/** Metric identifier */
	metricId: string;
	/** Metric name */
	name: TranslationKey;
	/** Time series data points */
	data: DataPoint[];
	/** Total for the period */
	total: number;
	/** Average for the period */
	average: number;
}

/**
 * Revenue breakdown by category
 */
export interface RevenueBreakdown {
	/** Service ID */
	serviceId: string;
	/** Service name */
	serviceName: string;
	/** Total revenue in cents */
	revenueCents: number;
	/** Number of appointments */
	appointmentCount: number;
	/** Percentage of total revenue */
	percentage: number;
}

/**
 * Staff performance metrics
 */
export interface StaffPerformance {
	/** Staff ID */
	staffId: string;
	/** Staff name */
	staffName: string;
	/** Total appointments */
	appointmentCount: number;
	/** Total revenue generated in cents */
	revenueCents: number;
	/** Occupancy rate (0-100) */
	occupancyRate: number;
	/** Average rating (if available) */
	averageRating?: number;
}

/**
 * Appointment statistics
 */
export interface AppointmentStats {
	/** Total appointments */
	total: number;
	/** Confirmed appointments */
	confirmed: number;
	/** Pending appointments */
	pending: number;
	/** Cancelled appointments */
	cancelled: number;
	/** Completed appointments */
	completed: number;
	/** Cancellation rate (0-100) */
	cancellationRate: number;
	/** Completion rate (0-100) */
	completionRate: number;
}

/**
 * Time period for metrics calculation
 */
export type TimePeriod = "week" | "month" | "quarter" | "year";

/**
 * Date range for custom period
 */
export interface DateRange {
	from: ISODate;
	to: ISODate;
}

/**
 * Complete dashboard metrics
 */
export interface DashboardMetrics {
	/** Key Performance Indicators */
	kpis: KPI[];
	/** Appointment statistics */
	appointmentStats: AppointmentStats;
	/** Revenue breakdown by service */
	revenueBreakdown: RevenueBreakdown[];
	/** Staff performance metrics */
	staffPerformance: StaffPerformance[];
	/** Appointment trends over time */
	appointmentTrends: TrendData;
	/** Revenue trends over time */
	revenueTrends: TrendData;
	/** Period for which metrics are calculated */
	period: TimePeriod;

	staffAmount: number;
	serviceAmount: number;
	/** Date range */
	dateRange: DateRange;
	/** Last updated timestamp */
	lastUpdated: ISODate;
}


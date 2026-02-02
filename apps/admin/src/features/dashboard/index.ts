/**
 * Dashboard Feature - Public API
 * 
 * Clean Architecture exports:
 * - Domain models (types and interfaces)
 * - UI components (presentation layer)
 * - Hooks (application layer)
 */

// Domain exports
export type {
	KPI,
	DataPoint,
	TrendData,
	RevenueBreakdown as IRevenueBreakdown,
	StaffPerformance as IStaffPerformance,
	AppointmentStats,
	TimePeriod,
	DateRange,
	DashboardMetrics,
} from "./domain/metrics";

// Hook exports
export { useDashboardMetrics } from "./hooks/use-dashboard-metrics";

// UI Component exports
export { DashboardView } from "./ui/dashboard-view";
export { MetricCard, MetricCardSkeleton } from "./ui/metric-card";
export { TrendChart } from "./ui/trend-chart";
export { StatsList, StatsListSkeleton } from "./ui/stats-list";
export {
	RevenueBreakdown,
	RevenueBreakdownSkeleton,
} from "./ui/revenue-breakdown";
export {
	StaffPerformance,
	StaffPerformanceSkeleton,
} from "./ui/staff-performance";
export { PeriodSelector } from "./ui/period-selector";


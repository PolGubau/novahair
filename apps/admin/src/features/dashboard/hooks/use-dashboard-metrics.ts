/**
 * Dashboard Metrics Hook
 * 
 * Main hook that orchestrates data fetching and metrics calculation
 * for the dashboard. Follows Clean Architecture by separating concerns:
 * - Data fetching (infrastructure)
 * - Business logic (domain services)
 * - Presentation (UI components)
 */

import { useAppointments, useServices, useStaffs } from "@novahair/client";
import { toISODate } from "@novahair/utils";
import { useMemo, useState } from "react";
import type { DashboardMetrics, TimePeriod } from "../domain/metrics";
import {
	getDateRangeForPeriod,
	getPreviousPeriodRange,
} from "../infra/date-range-calculator";
import {
	calculateAppointmentStats,
	calculateRevenueBreakdown,
	calculateStaffPerformance,
	calculateAppointmentTrends,
	calculateRevenueTrends,
	generateKPIs,
} from "../infra/metrics-calculator";

/**
 * Hook return type
 */
interface UseDashboardMetricsReturn {
	/** Calculated dashboard metrics */
	metrics: DashboardMetrics | null;
	/** Loading state */
	isLoading: boolean;
	/** Error state */
	error: Error | null;
	/** Current time period */
	period: TimePeriod;
	/** Change time period */
	setPeriod: (period: TimePeriod) => void;
	/** Refetch all data */
	refetch: () => void;
}

/**
 * Main dashboard metrics hook
 * 
 * @param tenantId - The tenant ID to fetch data for
 * @returns Dashboard metrics and controls
 */
export const useDashboardMetrics = (
	tenantId: string,
): UseDashboardMetricsReturn => {
	const [period, setPeriod] = useState<TimePeriod>("week");

	// Calculate date ranges
	const currentRange = useMemo(() => getDateRangeForPeriod(period), [period]);
	const previousRange = useMemo(
		() => getPreviousPeriodRange(period, currentRange),
		[period, currentRange],
	);

	// Fetch current period data
	const {
		appointments: currentAppointments,
		isLoading: appointmentsLoading,
		error: appointmentsError,
		refetch: refetchAppointments,
	} = useAppointments(tenantId, {
		from: currentRange.from,
		to: currentRange.to,
	});

	// Fetch previous period data for comparison
	const {
		appointments: previousAppointments,
		isLoading: previousLoading,
	} = useAppointments(tenantId, {
		from: previousRange.from,
		to: previousRange.to,
	});

	// Fetch services
	const {
		services,
		isLoading: servicesLoading,
		error: servicesError,
		refetch: refetchServices,
	} = useServices(tenantId);

	// Fetch staff
	const {
		staffs,
		isLoading: staffsLoading,
		error: staffsError,
		refetch: refetchStaffs,
	} = useStaffs(tenantId);

	// Aggregate loading and error states
	const isLoading =
		appointmentsLoading || previousLoading || servicesLoading || staffsLoading;
	const error = appointmentsError || servicesError || staffsError;

	// Calculate metrics
	const metrics = useMemo<DashboardMetrics | null>(() => {
		if (
			!currentAppointments ||
			!previousAppointments ||
			!services ||
			!staffs
		) {
			return null;
		}

		// Calculate all metrics using infrastructure services
		const appointmentStats = calculateAppointmentStats(currentAppointments);
		const revenueBreakdown = calculateRevenueBreakdown(currentAppointments);
		const staffPerformance = calculateStaffPerformance(
			currentAppointments,
			staffs,
		);
		const appointmentTrends = calculateAppointmentTrends(
			currentAppointments,
			currentRange,
		);
		const revenueTrends = calculateRevenueTrends(
			currentAppointments,
			currentRange,
		);
		const kpis = generateKPIs(currentAppointments, previousAppointments);

		return {
			kpis,
			appointmentStats,
			revenueBreakdown,
			staffPerformance,
			appointmentTrends,
			revenueTrends,
			period,
			dateRange: currentRange,
			lastUpdated: toISODate(new Date()),
		};
	}, [
		currentAppointments,
		previousAppointments,
		services,
		staffs,
		period,
		currentRange,
	]);

	// Refetch all data
	const refetch = () => {
		refetchAppointments();
		refetchServices();
		refetchStaffs();
	};

	return {
		metrics,
		isLoading,
		error,
		period,
		setPeriod,
		refetch,
	};
};


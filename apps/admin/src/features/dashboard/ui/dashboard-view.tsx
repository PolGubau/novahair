/**
 * Dashboard View Component
 * 
 * Main dashboard component that orchestrates all dashboard widgets
 * and displays comprehensive business metrics
 */

import { config } from "@novahair/utils";
import { RefreshCcw } from "lucide-react";
import { Button } from "@novahair/ui/button";
import { ApiErrorFallback } from "@novahair/ui/api-error-fallback";
import { useDashboardMetrics } from "../hooks/use-dashboard-metrics";
import { MetricCard, MetricCardSkeleton } from "./metric-card";
import { TrendChart } from "./trend-chart";
import { StatsList, StatsListSkeleton } from "./stats-list";
import { RevenueBreakdown, RevenueBreakdownSkeleton } from "./revenue-breakdown";
import {
	StaffPerformance,
	StaffPerformanceSkeleton,
} from "./staff-performance";
import { PeriodSelector } from "./period-selector";
import { AdminMain } from "~/app/layouts/admin-main";
import { useTranslation } from "react-i18next";

export const DashboardView = () => {
	const {t}=useTranslation();
	const { metrics, isLoading, error, period, setPeriod, refetch } =
		useDashboardMetrics(config.tenantId);
	// Error state
	if (error) {
		return (
			<div className="p-6">
				<ApiErrorFallback error={error} />
			</div>
		);
	}

	// Loading state
	if (isLoading || !metrics) {
		return (
			<div className="p-6 space-y-6">
				{/* Header skeleton */}
				<div className="flex items-center justify-between">
					<div className="h-8 w-48 bg-muted animate-pulse rounded" />
					<div className="h-10 w-64 bg-muted animate-pulse rounded-lg" />
				</div>

				{/* KPIs skeleton */}
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					{[1, 2, 3, 4].map((i) => (
						<MetricCardSkeleton key={i} />
					))}
				</div>

				{/* Charts skeleton */}
				<div className="grid gap-6 md:grid-cols-2">
					<div className="h-64 bg-muted animate-pulse rounded-lg" />
					<div className="h-64 bg-muted animate-pulse rounded-lg" />
				</div>

				{/* Stats skeleton */}
				<div className="grid gap-6 md:grid-cols-3">
					<StatsListSkeleton />
					<RevenueBreakdownSkeleton />
					<StaffPerformanceSkeleton />
				</div>
			</div>
		);
	}

	return (
		<AdminMain title="dashboard" description="business_overview" rightContent={	<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
			 
				<div className="flex items-center gap-3">
					<PeriodSelector value={period} onChange={setPeriod} />
					<Button
						variant="outline"
						size="sm"
						onClick={refetch}
						className="gap-2"
					>
					<RefreshCcw />
					<span className="max-md:hidden">{t("refresh")}</span>
 					</Button>
				</div>
			</div>}>
			{/* Header */}
		

			{/* KPIs Grid */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{metrics.kpis.map((kpi) => (
					<MetricCard key={kpi.id} kpi={kpi} />
				))}
			</div>

			{/* Trend Charts */}
			<div className="grid gap-6 md:grid-cols-2">
				<div className="rounded-lg border bg-card p-6">
					<TrendChart data={metrics.appointmentTrends} color="primary" />
				</div>
				<div className="rounded-lg border bg-card p-6">
					<TrendChart data={metrics.revenueTrends} color="success" />
				</div>
			</div>

			{/* Detailed Stats */}
			<div className="grid gap-6 md:grid-cols-3">
				{/* Appointment Stats */}
				<div className="rounded-lg border bg-card p-6">
					<StatsList stats={metrics.appointmentStats} />
				</div>

				{/* Revenue Breakdown */}
				<RevenueBreakdown data={metrics.revenueBreakdown} />

				{/* Staff Performance */}
				<StaffPerformance data={metrics.staffPerformance} />
			</div>

			{/* Footer info */}
			<div className="text-xs text-muted-foreground text-center pt-4 border-t">
				Última actualización:{" "}
				{new Date(metrics.lastUpdated).toLocaleString("es-ES", {
					dateStyle: "short",
					timeStyle: "short",
				})}
			</div>
		</AdminMain>
	);
};


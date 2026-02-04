/**
 * Dashboard View Component
 * 
 * Main dashboard component that orchestrates all dashboard widgets
 * and displays comprehensive business metrics
 */

import { config } from "@novahair/utils";
import { RefreshCcw, Users, Briefcase, TrendingUp, Calendar } from "lucide-react";
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
import { ClickableMetricCard } from "@novahair/ui/metric-card-clickable";
import { useRouter } from "@tanstack/react-router";
import { memo } from "react";
import type { TimePeriod, DashboardMetrics } from "../domain/metrics";
import { DashboardContentSkeleton } from "./dasboard-content-skeleton";

// Memoized header controls component
const DashboardControls = memo(({
	period,
	setPeriod,
	refetch
}: {
	period: TimePeriod;
	setPeriod: (period: TimePeriod) => void;
	refetch: () => void;
}) => {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
		</div>
	);
});

DashboardControls.displayName = "DashboardControls";

// Memoized dashboard content component
const DashboardContent = memo(({ metrics }: { metrics: DashboardMetrics }) => {
	const { t } = useTranslation();

	return (
		<>
			{/* Quick Navigation Cards */}
			<div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
				<ClickableMetricCard
					title={t("appointments")}
					value={metrics.kpis[0]?.value || "—"}
					icon={<Calendar className="h-5 w-5" />}
					href="/appointments/table"
					trend={{ value: 12, isPositive: true }}
				/>
				<ClickableMetricCard
					title={t("services")}
					value={metrics.kpis[1]?.value || "—"}
					icon={<Briefcase className="h-5 w-5" />}
					href="/services"
					trend={{ value: 5, isPositive: true }}
				/>
				<ClickableMetricCard
					title={t("team_members")}
					value={metrics.kpis[2]?.value || "—"}
					icon={<Users className="h-5 w-5" />}
					href="/team/members"
					trend={{ value: 2, isPositive: true }}
				/>
				<ClickableMetricCard
					title={t("revenue")}
					value={`€${metrics.kpis[3]?.value || "0"}`}
					icon={<TrendingUp className="h-5 w-5" />}
					href="/appointments/table"
					trend={{ value: 8, isPositive: true }}
				/>
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
		</>
	);
});

DashboardContent.displayName = "DashboardContent";

export const DashboardView = () => {
	const { metrics, isLoading, error, period, setPeriod, refetch } =
		useDashboardMetrics(config.tenantId);
	const loading = isLoading || !metrics;
	// Error state
 
	const renderContent = (error: any, loading: boolean, metrics: DashboardMetrics | null) => {
		if (error) {
			return (
				<div className="p-6">
					<ApiErrorFallback error={error} />
				</div>
			);
		}
		if (loading || !metrics) {
			return <DashboardContentSkeleton />;
		}
		return <DashboardContent metrics={metrics} />;
	};

 

	return (
		<AdminMain
			title="dashboard"
			description="business_overview"
			rightContent={<DashboardControls period={period} setPeriod={setPeriod} refetch={refetch} />}
		>
			{renderContent(error, loading, metrics)}
		</AdminMain>
	);
};


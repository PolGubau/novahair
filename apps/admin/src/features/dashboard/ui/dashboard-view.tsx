/**
 * Dashboard View Component
 * 
 * Main dashboard component that orchestrates all dashboard widgets
 * and displays comprehensive business metrics
 */

import { LineBarChart, QuickActions } from "@novahair/ui";
import { ApiErrorFallback } from "@novahair/ui/api-error-fallback";
import { Button } from "@novahair/ui/button";
import { ClickableMetricCard } from "@novahair/ui/metric-card-clickable";
import { config } from "@novahair/utils";
import { Briefcase, Calendar, RefreshCcw, TrendingUp, Users } from "lucide-react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { AdminMain } from "~/app/layouts/admin-main";
import type { DashboardMetrics, TimePeriod } from "../domain/metrics";
import { useDashboardMetrics } from "../hooks/use-dashboard-metrics";
import { DashboardContentSkeleton } from "./dashboard-content-skeleton";
import { PeriodSelector } from "./period-selector";
import { RevenueBreakdown } from "./revenue-breakdown";
import {
	StaffPerformance
} from "./staff-performance";
import { StatsList } from "./stats-list";

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
				<QuickActions actions={ 
					[{
						label: t("refresh"),
						icon: <RefreshCcw/>,
						onClick: refetch,
						id: "refresh",
					}]} />
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
					value={metrics.kpis[1]?.value??undefined}
					icon={<Calendar className="size-5" />}
					href="/appointments/table"
					trend={metrics.kpis[1]?.changePercentage }
				/>
				<ClickableMetricCard
					title={t("services")}
					value={metrics.serviceAmount}
					icon={<Briefcase className="size-5" />}
					href="/services"
 				/>
				<ClickableMetricCard
					title={t("team_members")}
					value={metrics.staffAmount}
					icon={<Users className="size-5" />}
					href="/team/members"
 				/>
				<ClickableMetricCard
					title={t("revenue")}
					value={`€${metrics.kpis[0]?.value || "0"}`}
					icon={<TrendingUp className="size-5" />}
					href="/appointments/table"
					trend={metrics.kpis[0]?.changePercentage }
				/>
			</div>

			{/* Trend Charts */}
			<div className="grid gap-3 md:grid-cols-2">
 					{/* <TrendChart data={metrics.appointmentTrends} color="primary" /> */}
					<LineBarChart data={metrics.appointmentTrends} title={t("appointments_amount")} description={
						<div className="text-xs text-muted-foreground">
							<span>{ t("total")}: </span>
						<span>{metrics.appointmentTrends.total}</span>
							<span className="mx-1">-</span>
							<span>{ t("average")}: </span>
							<span>{(metrics.appointmentTrends.average).toFixed(1)}</span>
					</div>}
				trend={metrics.kpis[1].value}
				/>
					<LineBarChart data={metrics.revenueTrends} title={t("revenue")} description={
						<div className="text-xs text-muted-foreground">
							<span>{ t("total")}: </span>
						<span>{metrics.revenueTrends.total}</span>
							<span className="mx-1">-</span>
							<span>{ t("average")}: </span>
							<span>{(metrics.revenueTrends.average).toFixed(1)}</span>
					</div>}
					trend={metrics.kpis[0].value}
				/>
 			 
			</div>

			{/* Detailed Stats */}
			<div className="grid gap-3 md:grid-cols-3">
				{/* Appointment Stats */}
				<div className="rounded-lg border p-6">
					<StatsList stats={metrics.appointmentStats} />
				</div>

				{/* Revenue Breakdown */}
				<RevenueBreakdown data={metrics.revenueBreakdown} />

				{/* Staff Performance */}
				<StaffPerformance data={metrics.staffPerformance} />
			</div>

			{/* Footer info */}
			<div className="text-xs text-muted-foreground text-center pt-4">
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


/**
 * Stats List Component
 * 
 * Displays a list of statistics with labels and values
 */

import { AlertCircle, CheckCircle2, Clock, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { AppointmentStats } from "../domain/metrics";

interface StatsListProps {
	stats: AppointmentStats;
}

export const StatsList = ({ stats }: StatsListProps) => {
	const {t}=useTranslation()
	const items = [
		{
			label: "Total",
			value: stats.total,
			icon: Clock,
			color: "text-blue-600 dark:text-blue-400",
			bgColor: "bg-blue-50 dark:bg-blue-950/30",
		},
		{
			label: "Completadas",
			value: stats.completed,
			icon: CheckCircle2,
			color: "text-green-600 dark:text-green-400",
			bgColor: "bg-green-50 dark:bg-green-950/30",
		},
		{
			label: "Confirmadas",
			value: stats.confirmed,
			icon: CheckCircle2,
			color: "text-emerald-600 dark:text-emerald-400",
			bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
		},
		{
			label: "Pendientes",
			value: stats.pending,
			icon: AlertCircle,
			color: "text-yellow-600 dark:text-yellow-400",
			bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
		},
		{
			label: "Canceladas",
			value: stats.cancelled,
			icon: XCircle,
			color: "text-red-600 dark:text-red-400",
			bgColor: "bg-red-50 dark:bg-red-950/30",
		},
	];

	return (
		<div className="space-y-3">
			<h4 className="text-sm font-medium text-foreground mb-4">
				{t("appointments_status")}
			</h4>

			<ul className="space-y-3 overflow-hidden divide-y">
				{items.map((item, index) => {
					const Icon = item.icon;
					const percentage =
						stats.total > 0 ? (item.value / stats.total) * 100 : 0;

					return (
						<li
							key={item.label}
							className="animate-in slide-in-from-left-8 flex items-center justify-between duration-300 fade-in fill-mode-both last:pb-0 pb-3"
							style={{
								animationDelay: `${index * 0.1}s`
							}}
						>
							<div className="flex items-center gap-3">
								<div className={`rounded-full p-2 ${item.bgColor}`}>
									<Icon className={`h-4 w-4 ${item.color}`} />
								</div>
								<div>
									<p className="text-sm font-medium">{item.label}</p>
									<p className="text-xs text-muted-foreground">
										{percentage.toFixed(1)}% del total
									</p>
								</div>
							</div>
							<div className="text-right">
								<p className="text-lg font-bold">{item.value}</p>
							</div>
						</li>
					);
				})}
			</ul>

			{/* Summary metrics */}
			<ul className="mt-4 grid grid-cols-2 gap-3 pt-3 ">
				<li className="rounded-lg bg-muted/50 p-3">
					<p className="text-xs text-muted-foreground mb-1">
						{t("completion_rate")}</p>
 					<p className="text-xl font-bold text-green-600 dark:text-green-400">
						{stats.completionRate.toFixed(1)}%
					</p>
				</li>
				<li className="rounded-lg bg-muted/50 p-3">
					<p className="text-xs text-muted-foreground mb-1">
						{ t("cancellation_rate")}</p>
					<p className="text-xl font-bold text-red-600 dark:text-red-400">
						{t("x_percent", { x: stats.cancellationRate.toFixed(1) })}
					</p>
				</li>
			</ul>
		</div>
	);
};

/**
 * Skeleton loader for StatsList
 */
export const StatsListSkeleton = () => {
	return (
		<div className="space-y-3">
			<div className="h-4 w-32 bg-muted animate-pulse rounded mb-4" />
			<div className="space-y-2">
				{[1, 2, 3, 4, 5].map((i) => (
					<div
						key={i}
						className="flex items-center justify-between rounded-lg border bg-card p-3"
					>
						<div className="flex items-center gap-3">
							<div className="h-8 w-8 bg-muted animate-pulse rounded-full" />
							<div className="space-y-1">
								<div className="h-4 w-20 bg-muted animate-pulse rounded" />
								<div className="h-3 w-16 bg-muted animate-pulse rounded" />
							</div>
						</div>
						<div className="h-6 w-8 bg-muted animate-pulse rounded" />
					</div>
				))}
			</div>
		</div>
	);
};


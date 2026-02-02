/**
 * Metric Card Component
 * 
 * Displays a single KPI with trend indicator
 */

import type { KPI } from "../domain/metrics";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "motion/react";

interface MetricCardProps {
	kpi: KPI;
	/** Optional click handler */
	onClick?: () => void;
}

export const MetricCard = ({ kpi, onClick }: MetricCardProps) => {
	const isPositive = kpi.changePercentage > 0;
	const isNegative = kpi.changePercentage < 0;
	const isNeutral = kpi.changePercentage === 0;

	// Determine if the change is good or bad based on trend direction
	const isGoodChange = kpi.isPositiveTrend ? isPositive : isNegative;

	const TrendIcon = isPositive
		? TrendingUp
		: isNegative
			? TrendingDown
			: Minus;

	const trendColorClass = isGoodChange
		? "text-green-600 dark:text-green-400"
		: isNeutral
			? "text-gray-500 dark:text-gray-400"
			: "text-red-600 dark:text-red-400";

	const bgTrendClass = isGoodChange
		? "bg-green-50 dark:bg-green-950/30"
		: isNeutral
			? "bg-gray-50 dark:bg-gray-950/30"
			: "bg-red-50 dark:bg-red-950/30";

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className={`
				relative overflow-hidden rounded-lg border bg-card p-6 shadow-sm
				transition-all duration-200 hover:shadow-md
				${onClick ? "cursor-pointer hover:border-primary/50" : ""}
			`}
			onClick={onClick}
		>
			{/* Label */}
			<p className="text-sm font-medium text-muted-foreground mb-2">
				{kpi.label}
			</p>

			{/* Value */}
			<div className="flex items-baseline gap-2 mb-3">
				<h3 className="text-3xl font-bold tracking-tight">
					{kpi.formattedValue}
				</h3>
			</div>

			{/* Trend Indicator */}
			<div className="flex items-center gap-2">
				<div
					className={`
						flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium
						${bgTrendClass} ${trendColorClass}
					`}
				>
					<TrendIcon className="h-3 w-3" />
					<span>
						{Math.abs(kpi.changePercentage).toFixed(1)}%
					</span>
				</div>
				<span className="text-xs text-muted-foreground">
					vs período anterior
				</span>
			</div>

			{/* Decorative gradient */}
			<div
				className={`
					absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-10 blur-2xl
					${isGoodChange ? "bg-green-500" : isNeutral ? "bg-gray-500" : "bg-red-500"}
				`}
			/>
		</motion.div>
	);
};

/**
 * Skeleton loader for MetricCard
 */
export const MetricCardSkeleton = () => {
	return (
		<div className="rounded-lg border bg-card p-6 shadow-sm">
			<div className="h-4 w-24 bg-muted animate-pulse rounded mb-2" />
			<div className="h-8 w-32 bg-muted animate-pulse rounded mb-3" />
			<div className="flex items-center gap-2">
				<div className="h-6 w-16 bg-muted animate-pulse rounded-full" />
				<div className="h-3 w-24 bg-muted animate-pulse rounded" />
			</div>
		</div>
	);
};


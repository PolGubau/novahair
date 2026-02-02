/**
 * Revenue Breakdown Component
 * 
 * Displays revenue distribution by service
 */

import type { RevenueBreakdown as RevenueBreakdownType } from "../domain/metrics";
import { motion } from "motion/react";

interface RevenueBreakdownProps {
	data: RevenueBreakdownType[];
	/** Maximum number of items to show */
	maxItems?: number;
}

export const RevenueBreakdown = ({
	data,
	maxItems = 5,
}: RevenueBreakdownProps) => {
	const displayData = data.slice(0, maxItems);
	const hasMore = data.length > maxItems;

	const formatCurrency = (cents: number): string => {
		return new Intl.NumberFormat("es-ES", {
			style: "currency",
			currency: "EUR",
		}).format(cents / 100);
	};

	if (data.length === 0) {
		return (
			<div className="rounded-lg border bg-card p-6">
				<h4 className="text-sm font-medium text-foreground mb-4">
					Ingresos por Servicio
				</h4>
				<p className="text-sm text-muted-foreground text-center py-8">
					No hay datos de ingresos disponibles
				</p>
			</div>
		);
	}

	return (
		<div className="rounded-lg border bg-card p-6">
			<h4 className="text-sm font-medium text-foreground mb-4">
				Ingresos por Servicio
			</h4>

			<div className="space-y-4">
				{displayData.map((item, index) => (
					<motion.div
						key={item.serviceId}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.05, duration: 0.3 }}
						className="space-y-2"
					>
						{/* Service name and revenue */}
						<div className="flex items-center justify-between">
							<div className="flex-1 min-w-0">
								<p className="text-sm font-medium truncate">
									{item.serviceName}
								</p>
								<p className="text-xs text-muted-foreground">
									{item.appointmentCount} cita{item.appointmentCount !== 1 ? "s" : ""}
								</p>
							</div>
							<div className="text-right ml-4">
								<p className="text-sm font-bold">
									{formatCurrency(item.revenueCents)}
								</p>
								<p className="text-xs text-muted-foreground">
									{item.percentage.toFixed(1)}%
								</p>
							</div>
						</div>

						{/* Progress bar */}
						<div className="relative h-2 bg-muted rounded-full overflow-hidden">
							<motion.div
								initial={{ width: 0 }}
								animate={{ width: `${item.percentage}%` }}
								transition={{ delay: index * 0.05 + 0.2, duration: 0.5 }}
								className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/70 rounded-full"
							/>
						</div>
					</motion.div>
				))}

				{hasMore && (
					<p className="text-xs text-muted-foreground text-center pt-2">
						+{data.length - maxItems} servicios más
					</p>
				)}
			</div>
		</div>
	);
};

/**
 * Skeleton loader for RevenueBreakdown
 */
export const RevenueBreakdownSkeleton = () => {
	return (
		<div className="rounded-lg border bg-card p-6">
			<div className="h-4 w-40 bg-muted animate-pulse rounded mb-4" />
			<div className="space-y-4">
				{[1, 2, 3, 4, 5].map((i) => (
					<div key={i} className="space-y-2">
						<div className="flex items-center justify-between">
							<div className="flex-1 space-y-1">
								<div className="h-4 w-32 bg-muted animate-pulse rounded" />
								<div className="h-3 w-16 bg-muted animate-pulse rounded" />
							</div>
							<div className="space-y-1 text-right">
								<div className="h-4 w-20 bg-muted animate-pulse rounded ml-auto" />
								<div className="h-3 w-12 bg-muted animate-pulse rounded ml-auto" />
							</div>
						</div>
						<div className="h-2 bg-muted animate-pulse rounded-full" />
					</div>
				))}
			</div>
		</div>
	);
};


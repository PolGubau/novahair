/**
 * Staff Performance Component
 * 
 * Displays staff performance metrics in a table format
 */

import type { StaffPerformance as StaffPerformanceType } from "../domain/metrics";
import { motion } from "motion/react";
import { Trophy, TrendingUp } from "lucide-react";

interface StaffPerformanceProps {
	data: StaffPerformanceType[];
	/** Maximum number of items to show */
	maxItems?: number;
}

export const StaffPerformance = ({
	data,
	maxItems = 5,
}: StaffPerformanceProps) => {
	const displayData = data.slice(0, maxItems);
	const hasMore = data.length > maxItems;

	const formatCurrency = (cents: number): string => {
		return new Intl.NumberFormat("es-ES", {
			style: "currency",
			currency: "EUR",
			minimumFractionDigits: 0,
		}).format(cents / 100);
	};

	if (data.length === 0) {
		return (
			<div className="rounded-lg border bg-card p-6">
				<h4 className="text-sm font-medium text-foreground mb-4">
					Rendimiento del Equipo
				</h4>
				<p className="text-sm text-muted-foreground text-center py-8">
					No hay datos de rendimiento disponibles
				</p>
			</div>
		);
	}

	return (
		<div className="rounded-lg border bg-card p-6">
			<div className="flex items-center gap-2 mb-4">
				<Trophy className="h-4 w-4 text-yellow-500" />
				<h4 className="text-sm font-medium text-foreground">
					Rendimiento del Equipo
				</h4>
			</div>

			<div className="space-y-3">
				{displayData.map((staff, index) => {
					const isTopPerformer = index === 0;

					return (
						<motion.div
							key={staff.staffId}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: index * 0.05, duration: 0.3 }}
							className={`
								relative rounded-lg border p-4 transition-all
								${isTopPerformer ? "bg-linear-to-r from-yellow-50 to-transparent dark:from-yellow-950/20 border-yellow-200 dark:border-yellow-800" : "bg-card "}
							`}
						>
							{/* Top performer badge */}
							{isTopPerformer && (
								<div className="absolute -top-2 -right-2">
									<div className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
										<Trophy className="h-3 w-3" />
										Top
									</div>
								</div>
							)}

							<div className="flex items-start justify-between gap-4">
								{/* Staff info */}
								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-2 mb-2">
										<span className="text-sm font-medium text-muted-foreground">
											#{index + 1}
										</span>
										<h5 className="text-sm font-semibold truncate">
											{staff.staffName}
										</h5>
									</div>

									<div className="grid grid-cols-2 gap-2 text-xs">
										<div>
											<p className="text-muted-foreground">Citas</p>
											<p className="font-medium">{staff.appointmentCount}</p>
										</div>
										<div>
											<p className="text-muted-foreground">Ingresos</p>
											<p className="font-medium text-green-600 dark:text-green-400">
												{formatCurrency(staff.revenueCents)}
											</p>
										</div>
									</div>
								</div>

								{/* Performance indicator */}
								<div className="flex flex-col items-end gap-1">
									<div className="flex items-center gap-1 text-xs text-muted-foreground">
										<TrendingUp className="h-3 w-3" />
										<span>Activo</span>
									</div>
									{staff.averageRating && (
										<div className="text-xs font-medium">
											⭐ {staff.averageRating.toFixed(1)}
										</div>
									)}
								</div>
							</div>

							{/* Progress bar for relative performance */}
							{data.length > 1 && (
								<div className="mt-3 relative h-1.5 bg-muted rounded-full overflow-hidden">
									<motion.div
										initial={{ width: 0 }}
										animate={{
											width: `${(staff.appointmentCount / data[0].appointmentCount) * 100}%`,
										}}
										transition={{ delay: index * 0.05 + 0.2, duration: 0.5 }}
										className={`
											absolute inset-y-0 left-0 rounded-full
											${isTopPerformer ? "bg-yellow-500" : "bg-primary"}
										`}
									/>
								</div>
							)}
						</motion.div>
					);
				})}

				{hasMore && (
					<p className="text-xs text-muted-foreground text-center pt-2">
						+{data.length - maxItems} miembros más del equipo
					</p>
				)}
			</div>
		</div>
	);
};

/**
 * Skeleton loader for StaffPerformance
 */
export const StaffPerformanceSkeleton = () => {
	return (
		<div className="rounded-lg border bg-card p-6">
			<div className="h-4 w-40 bg-muted animate-pulse rounded mb-4" />
			<div className="space-y-3">
				{[1, 2, 3, 4, 5].map((i) => (
					<div key={i} className="rounded-lg border p-4">
						<div className="flex items-start justify-between gap-4">
							<div className="flex-1 space-y-2">
								<div className="h-4 w-32 bg-muted animate-pulse rounded" />
								<div className="grid grid-cols-2 gap-2">
									<div className="h-8 bg-muted animate-pulse rounded" />
									<div className="h-8 bg-muted animate-pulse rounded" />
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};


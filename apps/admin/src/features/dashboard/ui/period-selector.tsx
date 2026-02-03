/**
 * Period Selector Component
 * 
 * Allows users to select different time periods for dashboard metrics
 */

import { Select } from "@novahair/ui";
import type { TimePeriod } from "../domain/metrics";
import { Calendar, Clock, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { TranslationKey } from "@novahair/utils";

interface PeriodSelectorProps {
	/** Current selected period */
	value: TimePeriod;
	/** Callback when period changes */
	onChange: (period: TimePeriod) => void;
}

const periods: Array<{ value: TimePeriod; label: TranslationKey; icon?: typeof Clock }> =
	[
		{ value: "today", label: "Hoy", icon: Clock },
		{ value: "week", label: "Semana", icon: Calendar },
		{ value: "month", label: "Mes", icon: Calendar },
		{ value: "quarter", label: "Trimestre", icon: TrendingUp },
		{ value: "year", label: "Año", icon: TrendingUp },
	];

export const PeriodSelector = ({ value, onChange }: PeriodSelectorProps) => {
	return (<>
		
		<div className="md:hidden">
			<Select value={value} onValueChange={onChange} options={periods.map((period) => ({
				value: period.value,
				label: period.label,
 			}))}  />

		</div>

		<div className="flex items-center gap-1 rounded-lg border max-md:hidden">
			{periods.map((period) => {
				const isActive = value === period.value;
				const Icon = period.icon;

				return (
					<button
						key={period.value}
						type="button"
						onClick={() => onChange(period.value)}
						className={`
							relative px-2 py-1 rounded-md text-sm font-medium
							transition-colors duration-200 cursor-pointer
							${
								isActive
									? "text-primary-foreground"
									: "text-muted-foreground hover:text-foreground hover:bg-accent"
							}
						`}
					>
						{/* Active background */}
						{isActive && (
							<motion.div
								layoutId="active-period"
								className="absolute inset-0 bg-primary"
								transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
							/>
						)}

						{/* Content */}
						<span className="relative z-10 flex items-center gap-1.5">
							{Icon && <Icon className="h-3.5 w-3.5" />}
							{period.label}
						</span>
					</button>
				);
			})}
		</div></>
	);
};


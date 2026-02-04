import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@novahair/utils";

interface ClickableMetricCardProps {
	title: string;
	value?: string | number;
	icon: React.ReactNode;
	href: string;
	description?: string;
	className?: string;
	trend?: {
		value: number;
		isPositive: boolean;
	};
}

export function ClickableMetricCard({
	title,
	value,
	icon,
	href,
	description,
	className,
	trend,
}: ClickableMetricCardProps) {
	return (
		<Link
			to={href}
			className={cn(
				"relative overflow-hidden group rounded-lg border bg-card p-4 transition-all hover:shadow-md hover:border-primary/50 active:scale-95",
				className
			)}
		>
			{/* Background gradient on hover */}
			<div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

			{/* Content */}
			<div className="relative space-y-3">
				{/* Header */}
				<div className="flex items-start justify-between">
					<h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
					<div className="text-primary/60 group-hover:text-primary transition-colors">
						{icon}
					</div>
				</div>

				{/* Value */}
				<div className="space-y-1">
{value &&					<p className="text-2xl font-bold">{value}</p>}
					{description && (
						<p className="text-xs text-muted-foreground">{description}</p>
					)}
				</div>

				{/* Trend or CTA */}
				<div className="flex items-center justify-between pt-2 border-t">
					{trend && (
						<span
							className={cn("text-xs font-medium", {
								"text-green-600": trend.isPositive,
								"text-red-600": !trend.isPositive,
							})}
						>
							{trend.isPositive ? "+" : ""}{trend.value}%
						</span>
					)}
					<ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
				</div>
			</div>
		</Link>
	);
}

/**
 * Trend Chart Component
 * 
 * Displays time series data as a line/area chart
 * Using a simple SVG-based implementation for lightweight rendering
 */

import type { TrendData } from "../domain/metrics";
import { motion } from "motion/react";
import { useMemo } from "react";

interface TrendChartProps {
	data: TrendData;
	/** Chart height in pixels */
	height?: number;
	/** Show area fill */
	showArea?: boolean;
	/** Color theme */
	color?: "primary" | "success" | "warning" | "danger";
}

export const TrendChart = ({
	data,
	height = 200,
	showArea = true,
	color = "primary",
}: TrendChartProps) => {
	const { points, maxValue, minValue, pathD, areaD } = useMemo(() => {
		if (data.data.length === 0) {
			return { points: [], maxValue: 0, minValue: 0, pathD: "", areaD: "" };
		}

		const values = data.data.map((d) => d.value);
		const max = Math.max(...values);
		const min = Math.min(...values, 0);
		const range = max - min || 1;

		const width = 100; // Use percentage-based width
		const padding = 5;
		const chartHeight = height - padding * 2;
		const stepX = width / (data.data.length - 1 || 1);

		const chartPoints = data.data.map((point, index) => {
			const x = index * stepX;
			const y = padding + chartHeight - ((point.value - min) / range) * chartHeight;
			return { x, y, value: point.value, label: point.label };
		});

		// Create SVG path for line
		const path = chartPoints
			.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
			.join(" ");

		// Create SVG path for area (filled region under the line)
		const area = `${path} L ${chartPoints[chartPoints.length - 1].x} ${height - padding} L 0 ${height - padding} Z`;

		return {
			points: chartPoints,
			maxValue: max,
			minValue: min,
			pathD: path,
			areaD: area,
		};
	}, [data, height]);

	const colorClasses = {
		primary: {
			stroke: "stroke-primary",
			fill: "fill-primary/10",
			dot: "fill-primary",
		},
		success: {
			stroke: "stroke-green-500",
			fill: "fill-green-500/10",
			dot: "fill-green-500",
		},
		warning: {
			stroke: "stroke-yellow-500",
			fill: "fill-yellow-500/10",
			dot: "fill-yellow-500",
		},
		danger: {
			stroke: "stroke-red-500",
			fill: "fill-red-500/10",
			dot: "fill-red-500",
		},
	};

	const colors = colorClasses[color];

	if (data.data.length === 0) {
		return (
			<div
				className="flex items-center justify-center rounded-lg border bg-muted/20"
				style={{ height }}
			>
				<p className="text-sm text-muted-foreground">No hay datos disponibles</p>
			</div>
		);
	}

	return (
		<div className="w-full">
			{/* Header */}
			<div className="mb-4 flex items-baseline justify-between">
				<div>
					<h4 className="text-sm font-medium text-foreground">{data.name}</h4>
					<p className="text-xs text-muted-foreground">
						Total: {data.total.toFixed(0)} | Promedio: {data.average.toFixed(1)}
					</p>
				</div>
			</div>

			{/* Chart */}
			<div className="relative">
				<svg
					viewBox={`0 0 100 ${height}`}
					preserveAspectRatio="none"
					className="w-full"
					style={{ height }}
				>
					{/* Area fill */}
					{showArea && (
						<motion.path
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5 }}
							d={areaD}
							className={colors.fill}
						/>
					)}

					{/* Line */}
					<motion.path
						initial={{ pathLength: 0 }}
						animate={{ pathLength: 1 }}
						transition={{ duration: 1, ease: "easeInOut" }}
						d={pathD}
						fill="none"
						className={colors.stroke}
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>

					{/* Data points */}
					{points.map((point, index) => (
						<motion.circle
							key={index}
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ delay: index * 0.05, duration: 0.3 }}
							cx={point.x}
							cy={point.y}
							r="1.5"
							className={colors.dot}
						/>
					))}
				</svg>

				{/* X-axis labels */}
				<div className="mt-2 flex justify-between text-xs text-muted-foreground">
					{data.data.map((point, index) => {
						// Show only first, middle, and last labels to avoid crowding
						const showLabel =
							index === 0 ||
							index === data.data.length - 1 ||
							index === Math.floor(data.data.length / 2);

						return showLabel ? (
							<span key={index}>{point.label}</span>
						) : (
							<span key={index} />
						);
					})}
				</div>
			</div>
		</div>
	);
};


 
import { TrendingDown, TrendingUp } from "lucide-react";
import React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
 
 import { cn, ISODate, TranslationKey } from "@novahair/utils";
import { useTranslation } from "react-i18next";
import { Badge } from "../badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./primitives";
import { TrendChip } from "../trend-chip";

 

const CHART_MARGIN = 35;

// const chartData = [
//   { date: "January", value: 342 },
//   { date: "February", value: 676 },
//   { date: "March", value: 512 },
//   { date: "April", value: 629 },
//   { date: "May", value: 458 },
//   { date: "June", value: 781 },
//   { date: "July", value: 394 },
//   { date: "August", value: 924 },
//   { date: "September", value: 647 },
//   { date: "October", value: 532 },
//   { date: "November", value: 803 },
//   { date: "December", value: 271 },
//   { date: "January", value: 342 },
//   { date: "February", value: 876 },
//   { date: "March", value: 512 },
//   { date: "April", value: 629 },
// ];

const chartConfig = {
  value: {
    label: "Value",
    color: "var(--primary)",
  },
} satisfies ChartConfig;
/**
 * Time series data point for charts
 */
export interface DataPoint {
	/** Date of the data point */
	date: ISODate;
	/** Numeric value */
	value: number;
	/** Optional label for display */
	label?: string;
}


export interface TrendData {
	/** Metric identifier */
	metricId: string;
	/** Metric name */
	name: TranslationKey;
	/** Time series data points */
	data: DataPoint[];
	/** Total for the period */
	total: number;
	/** Average for the period */
	average: number;
}
type LineBarChartProps = {
  data: TrendData;
  title?: React.ReactNode;
  trend?: number;
  description?: React.ReactNode;
}
export function LineBarChart(props: LineBarChartProps) {
  const { data, title, description,trend } = props;
  const {i18n} = useTranslation()
  return (
    <Card className="">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <span
            className={cn("text-2xl tracking-tighter")}
          >
            {title}
          </span>
          {trend !== undefined && <TrendChip trend={trend} />}
          
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
      <ChartContainer config={chartConfig} className="h-72 w-full">
          <AreaChart accessibilityLayer data={data.data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                return new Intl.DateTimeFormat(i18n.language, { month: "numeric",day: "numeric" }).format(new Date(value));
              }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent labelFormatter={label => {
              const date = new Intl.DateTimeFormat(i18n.language, { month: "long", day: "numeric", year: "numeric" }).format(new Date(label));
              return (
                  <span className="text-sm text-muted-foreground">{date}</span>
              )
            }}/>} />
            <defs>
              <linearGradient
                id="gradient-chart-primary"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0.1}
                />
              </linearGradient>
               
             </defs>
            <Area
              type="monotone"
              dataKey="value"
              fill="url(#gradient-chart-primary)"
              fillOpacity={0.4}
              stroke="var(--color-primary)"
              stackId="a"
              strokeWidth={0.8}
              strokeDasharray={"3 3"}
            />
             
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

interface CustomReferenceLabelProps {
  viewBox?: {
    x?: number;
    y?: number;
  };
  value: number;
}

const CustomReferenceLabel: React.FC<CustomReferenceLabelProps> = (props) => {
  const { viewBox, value } = props;
  const x = viewBox?.x ?? 0;
  const y = viewBox?.y ?? 0;

  // we need to change width based on value length
  const width = React.useMemo(() => {
    const characterWidth = 8; // Average width of a character in pixels
    const padding = 10;
    return value.toString().length * characterWidth + padding;
  }, [value]);

  return (
    <>
      <rect
        x={x - CHART_MARGIN}
        y={y - 9}
        width={width}
        height={18}
        fill="var(--secondary-foreground)"
        rx={4}
      />
      <text
        fontWeight={600}
        x={x - CHART_MARGIN + 6}
        y={y + 4}
        fill="var(--primary-foreground)"
      >
        {value}
      </text>
    </>
  );
};

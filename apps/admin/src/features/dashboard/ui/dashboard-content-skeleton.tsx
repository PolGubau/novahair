import { MetricCardSkeleton } from './metric-card';
import { RevenueBreakdownSkeleton } from './revenue-breakdown';
import { StaffPerformanceSkeleton } from './staff-performance';
import { StatsListSkeleton } from './stats-list';

export const DashboardContentSkeleton = () => {
  return (
      <div className="p-6 space-y-6">
        {/* Header skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 bg-muted animate-pulse rounded" />
          <div className="h-10 w-64 bg-muted animate-pulse rounded-lg" />
        </div>

        {/* KPIs skeleton */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <MetricCardSkeleton key={i} />
          ))}
        </div>

        {/* Charts skeleton */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="h-64 bg-muted animate-pulse rounded-lg" />
          <div className="h-64 bg-muted animate-pulse rounded-lg" />
        </div>

        {/* Stats skeleton */}
        <div className="grid gap-6 md:grid-cols-3">
          <StatsListSkeleton />
          <RevenueBreakdownSkeleton />
          <StaffPerformanceSkeleton />
        </div>
      </div>
    );
}

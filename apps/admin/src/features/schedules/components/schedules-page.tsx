import { type Staff, useStaffs } from "@novahair/client";
import { Drawer, IconButton, QuickActions } from "@novahair/ui";
import { ApiErrorFallback } from "@novahair/ui/api-error-fallback";
import { FeatureErrorBoundary } from "@novahair/ui/feature-error-boundary";
import { Loader } from "@novahair/ui/loader";
import { config, type ISODate } from "@novahair/utils";
import { isSameDay, parseISO } from "date-fns";
import { t } from "i18next";
import { Filter, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { AdminMain } from "~/app/layouts/admin-main";
import {
	ScheduleAssignmentDrawer,
	StaffFilter,
	WeeklyCalendar,
	WeekNavigation,
} from "~/features/schedules";
import {
	END_HOUR,
	START_HOUR,
} from "~/features/schedules/components/calendar/constants";
import { useFilteredStaffs } from "~/features/schedules/hooks/use-filtered-staffs";
import { useSchedulesQuery } from "~/features/schedules/hooks/use-schedules-query";
import { useWeekRange } from "~/features/schedules/hooks/use-week-range";

export function SchedulesPage() {
	const {
		staffs,
		isLoading: staffsLoading,
		error: staffsError,
	} = useStaffs(config.tenantId);
	const [isFiltersDrawerOpen, setIsFiltersDrawerOpen] = useState(false);
	const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
	const [selectedDates, setSelectedDates] = useState<Date[]>([]);

	const { currentWeekStart, setCurrentWeekStart, weekDays, from, to } =
		useWeekRange();

	const { filteredStaffs, setFilteredStaffs, filteredStaffIds } =
		useFilteredStaffs(staffs);

	const { data: schedulesData, isLoading: isSchedulesLoading } =
		useSchedulesQuery(
			config.tenantId,
			from,
			to,
			filteredStaffIds,
			!!staffs,
		);

	const toggleDate = (date: Date) => {
		setSelectedDates((prev) =>
			prev.some((d) => isSameDay(d, date))
				? prev.filter((d) => !isSameDay(d, date))
				: [...prev, date],
		);
	};

	const getSchedulesForDay = (date: Date) => {
		if (!schedulesData || !staffs) return [];

		const schedules: {
			id: string;
			staff: Staff;
			start: ISODate;
			end: ISODate;
		}[] = [];

		for (const schedule of schedulesData) {
			if (isSameDay(parseISO(schedule.startTime), date)) {
				// The schedule already has the staff object from the backend
				if (schedule.staff) {
					schedules.push({
						end: schedule.endTime,
						id: schedule.id,
						staff: schedule.staff,
						start: schedule.startTime,
					});
				}
			}
		}
		return schedules;
	};

	

	if (staffsLoading) {
		return (
			<FeatureErrorBoundary featureName="schedules">
				<AdminMain description="manage_your_team_schedules" title="schedules">
					<Loader />
				</AdminMain>
			</FeatureErrorBoundary>
		);
	}

	if (staffsError) {
		return (
			<FeatureErrorBoundary featureName="schedules">
				<AdminMain description="manage_your_team_schedules" title="schedules">
					<ApiErrorFallback error={staffsError} />
				</AdminMain>
			</FeatureErrorBoundary>
		);
	}

	return (
		<FeatureErrorBoundary featureName="schedules">
			<AdminMain
				title="schedules"
				description="manage_your_team_schedules"
				rightContent={
					<div>
						<QuickActions
					actions={[{
									id: "create",
									label: t("add_schedules"),
									icon: <Plus />,
									onClick() {setIsCreateDrawerOpen(true)},
						},
						{
							id: "filter",
							label: t("filter"),
							icon: <Filter />,
							onClick() {setIsFiltersDrawerOpen(true)},
								},
								
						]}
					/>
					</div>
				}
			
			>
				<div className="flex-1 space-y-4 ">
					<WeekNavigation
						currentWeekStart={currentWeekStart}
						setCurrentWeekStart={setCurrentWeekStart}
					/>

					<WeeklyCalendar
						endHour={END_HOUR}
						getSchedulesForDay={getSchedulesForDay}
						isLoading={isSchedulesLoading}
						selectedDates={selectedDates}
						staffs={staffs || []}
						startHour={START_HOUR}
						toggleDate={toggleDate}
						weekDays={weekDays}
					/>
			</div>
			<ScheduleAssignmentDrawer 
				selectedDays={selectedDates}
				setSelectedDays={setSelectedDates}
				open={isCreateDrawerOpen}
				setOpen={setIsCreateDrawerOpen}
			/>

				<Drawer
					description="customize_your_schedule_view"
					onClose={() => setIsFiltersDrawerOpen(false)}
					open={isFiltersDrawerOpen}
					title="filter"
				>
					<StaffFilter
						filteredStaffs={filteredStaffs}
						isLoading={staffsLoading}
						setFilteredStaffs={setFilteredStaffs}
					/>
				</Drawer>
			</AdminMain>
		</FeatureErrorBoundary>
	);
}

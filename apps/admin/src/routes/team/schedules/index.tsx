import {
	type Schedule,
	type Staff,
	staffScheduleRepository,
	useStaffs,
} from "@novahair/client";
import { Drawer, IconButton } from "@novahair/ui";
import { ApiErrorFallback } from "@novahair/ui/api-error-fallback";
import { FeatureErrorBoundary } from "@novahair/ui/feature-error-boundary";
import { AdminMain } from "@novahair/ui/layouts/admin/admin-main";
import { Loader } from "@novahair/ui/loader";
import { config, type ISODate } from "@novahair/utils";
import { useQueries } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { addDays, format, isSameDay, parseISO, startOfWeek } from "date-fns";
import { Filter } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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

export const Route = createFileRoute("/team/schedules/")({
	component: RouteComponent,
});

function RouteComponent() {
	const {
		staffs,
		isLoading: staffsLoading,
		error: staffsError,
	} = useStaffs(config.tenantId);
	const [isFiltersDrawerOpen, setIsFiltersDrawerOpen] = useState(false);

	const staffSchedules = useQueries({
		queries:
			staffs?.map((staff) => ({
				queryKey: ["staff-schedule", config.tenantId, staff.id],
				queryFn: () =>
					staffScheduleRepository.getByStaff(config.tenantId, staff.id),
				enabled: !!staffs,
			})) || [],
	});

	const isSchedulesLoading = staffSchedules.some((q) => q.isLoading);

	const [selectedDates, setSelectedDates] = useState<Date[]>([]);

	const [filteredStaffs, setFilteredStaffs] = useState<Staff[]>([]);

	useEffect(() => {
		if (staffs) {
			setFilteredStaffs(staffs);
		}
	}, [staffs]);

	// Week starting from Monday
	const [currentWeekStart, setCurrentWeekStart] = useState(
		startOfWeek(new Date(), { weekStartsOn: 1 }),
	);
	const weekDays = Array.from({ length: 7 }, (_, i) =>
		addDays(currentWeekStart, i),
	);

	const toggleDate = (date: Date) => {
		setSelectedDates((prev) =>
			prev.some((d) => isSameDay(d, date))
				? prev.filter((d) => !isSameDay(d, date))
				: [...prev, date],
		);
	};

	const getSchedulesForDay = (date: Date) => {
		const schedules: {
			id: string;
			staff: Staff;
			start: ISODate;
			end: ISODate;
		}[] = [];
		for (const [index, query] of staffSchedules.entries()) {
			if (
				query.data &&
				staffs &&
				filteredStaffs.some((s) => s.id === staffs[index].id)
			) {
				const staff = staffs[index];
				for (const schedule of query.data as Schedule[]) {
					if (isSameDay(parseISO(schedule.startTime), date)) {
						schedules.push({
							id: schedule.id,
							staff,
							start: schedule.startTime,
							end: schedule.endTime,
						});
					}
				}
			}
		}
		return schedules;
	};

	if (staffsLoading) {
		return (
			<FeatureErrorBoundary featureName="Team Schedules">
				<AdminMain title="schedules" description="manage_your_team_schedules">
					<Loader />
				</AdminMain>
			</FeatureErrorBoundary>
		);
	}

	if (staffsError) {
		return (
			<FeatureErrorBoundary featureName="Team Schedules">
				<AdminMain title="schedules" description="manage_your_team_schedules">
					<ApiErrorFallback error={staffsError} />
				</AdminMain>
			</FeatureErrorBoundary>
		);
	}

	return (
		<FeatureErrorBoundary featureName="Team Schedules">
			<AdminMain
				title="schedules"
				description="manage_your_team_schedules"
				rightContent={
					<div className="flex gap-1">
						<IconButton
							variant="outline"
							icon={<Filter />}
							onClick={() => setIsFiltersDrawerOpen(true)}
						/>

						<ScheduleAssignmentDrawer
							selectedDays={selectedDates}
							setSelectedDays={setSelectedDates}
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
						startHour={START_HOUR}
						endHour={END_HOUR}
						weekDays={weekDays}
						selectedDates={selectedDates}
						toggleDate={toggleDate}
						getSchedulesForDay={getSchedulesForDay}
						isLoading={isSchedulesLoading}
						staffs={staffs || []}
					/>
				</div>

				<Drawer
					title="filter"
					description="customize_your_schedule_view"
					open={isFiltersDrawerOpen}
					onClose={() => setIsFiltersDrawerOpen(false)}
				>
					<StaffFilter
						filteredStaffs={filteredStaffs}
						setFilteredStaffs={setFilteredStaffs}
						isLoading={staffsLoading}
					/>
				</Drawer>
			</AdminMain>
		</FeatureErrorBoundary>
	);
}

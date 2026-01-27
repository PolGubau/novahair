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
import { addDays, isSameDay, parseISO, startOfWeek } from "date-fns";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
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
				enabled: !!staffs,
				queryFn: () =>
					staffScheduleRepository.getByStaff(config.tenantId, staff.id),
				queryKey: ["staff-schedule", config.tenantId, staff.id],
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
							end: schedule.endTime,
							id: schedule.id,
							staff,
							start: schedule.startTime,
						});
					}
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
				description="manage_your_team_schedules"
				rightContent={
					<div className="flex gap-1">
						<IconButton
							icon={<Filter />}
							onClick={() => setIsFiltersDrawerOpen(true)}
							variant="outline"
						/>

						<ScheduleAssignmentDrawer
							selectedDays={selectedDates}
							setSelectedDays={setSelectedDates}
						/>
					</div>
				}
				title="schedules"
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

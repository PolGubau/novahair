import {
	type Schedule,
	type Staff,
	staffScheduleRepository,
	useStaffs,
} from "@novahair/client";
import { Drawer, IconButton } from "@novahair/ui";
import { ApiErrorFallback } from "@novahair/ui/api-error-fallback";
import { FeatureErrorBoundary } from "@novahair/ui/feature-error-boundary";
import { AdminMain } from "~/app/layouts/admin-main";
import { Loader } from "@novahair/ui/loader";
import { config, type ISODate } from "@novahair/utils";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { addDays, endOfDay, isSameDay, parseISO, startOfWeek } from "date-fns";
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

	// Week starting from Monday
	const [currentWeekStart, setCurrentWeekStart] = useState(
		startOfWeek(new Date(), { weekStartsOn: 1 }),
	);
	const [filteredStaffs, setFilteredStaffs] = useState<Staff[]>([]);

	// Calculate from/to dates for the current week
	const { from, to } = useMemo(() => {
		const weekEnd = endOfDay(addDays(currentWeekStart, 6));
		return {
			from: currentWeekStart.toISOString() as ISODate,
			to: weekEnd.toISOString() as ISODate,
		};
	}, [currentWeekStart]);

	const filteredStaffIds = useMemo(
		() => filteredStaffs.map((staff) => staff.id),
		[filteredStaffs],
	);

	const { data: schedulesData, isLoading: isSchedulesLoading } = useQuery({
		queryKey: [
			"staff-schedules",
			config.tenantId,
			from,
			to,
			filteredStaffIds,
		],
		queryFn: () =>
			staffScheduleRepository.getByTenant(
				config.tenantId,
				from,
				to,
				filteredStaffIds.length > 0 ? filteredStaffIds : undefined,
			),
		enabled: !!staffs,
	});

	const [selectedDates, setSelectedDates] = useState<Date[]>([]);


	useEffect(() => {
		if (staffs) {
			setFilteredStaffs(staffs);
		}
	}, [staffs]);

	const weekDays = useMemo(
		() => Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i)),
		[currentWeekStart],
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
				// Find the staff member for this schedule
				const staff = staffs.find((s) => schedule.staffId === s.id);
				if (staff) {
					schedules.push({
						end: schedule.endTime,
						id: schedule.id,
						staff,
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

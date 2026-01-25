import { staffScheduleRepository, useStaffs } from "@novahair/client";
import { Drawer, IconButton } from "@novahair/ui";
import { ApiErrorFallback } from "@novahair/ui/api-error-fallback";
import { FeatureErrorBoundary } from "@novahair/ui/feature-error-boundary";
import { AdminMain } from "@novahair/ui/layouts/admin/admin-main";
import { Loader } from "@novahair/ui/loader";
import { config } from "@novahair/utils";
import { useQueries } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { addDays, format, isSameDay, parseISO, startOfWeek } from "date-fns";
import { Filter } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ScheduleAssignmentDrawer } from "./components/ScheduleAssignmentDrawer";
import { StaffFilterSidebar } from "./components/StaffFilterSidebar";
import { WeekNavigation } from "./components/WeekNavigation";
import { WeeklyCalendar } from "./components/WeeklyCalendar";

export const Route = createFileRoute("/team/schedules/")({
	component: RouteComponent,
});

type TimeSlot = {
	start: string;
	end: string;
};

type Staff = {
	id: string;
	name: string;
};

type Schedule = {
	startTime: string;
	endTime: string;
};

function RouteComponent() {
	const {
		staffs,
		isLoading: staffsLoading,
		error: staffsError,
	} = useStaffs(config.tenantId);
	const [isFiltersDrawerOpen, setIsFiltersDrawerOpen] = useState(false);
	const colorMap = useMemo(() => {
		const colors = [
			"bg-blue-500",
			"bg-green-500",
			"bg-red-500",
			"bg-yellow-500",
			"bg-purple-500",
			"bg-pink-500",
			"bg-indigo-500",
		];
		return Object.fromEntries(
			staffs?.map((s, i) => [s.name, colors[i % colors.length]]) || [],
		);
	}, [staffs]);

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

	const [filteredStaffs, setFilteredStaffs] = useState<string[]>([]);

	useEffect(() => {
		if (staffs) {
			setFilteredStaffs(staffs.map((s: Staff) => s.id));
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
		const schedules: { staff: string; start: string; end: string }[] = [];
		for (const [index, query] of staffSchedules.entries()) {
			if (query.data && staffs && filteredStaffs.includes(staffs[index].id)) {
				const staff = staffs[index];
				for (const schedule of query.data as Schedule[]) {
					const startDate = parseISO(schedule.startTime);
					if (isSameDay(startDate, date)) {
						schedules.push({
							staff: staff.name,
							start: format(startDate, "HH:mm"),
							end: format(parseISO(schedule.endTime), "HH:mm"),
						});
					}
				}
			}
		}
		return schedules;
	};

	const handleScheduleDrag = async (
		schedule: { staff: string; start: string; end: string } & {
			originalDate: Date;
		},
		newDate: Date,
		newStart: string,
		newEnd: string,
	) => {
		try {
			console.log("handleScheduleDrag called with:", {
				schedule,
				newDate,
				newStart,
				newEnd,
			});

			// Find the staff ID
			const staff = staffs?.find((s) => s.name === schedule.staff);
			if (!staff) {
				console.error(
					"Staff not found:",
					schedule.staff,
					"available staffs:",
					staffs?.map((s) => s.name),
				);
				return;
			}

			// Get current schedules for this staff
			const staffIndex = staffs.findIndex((s) => s.id === staff.id);
			const currentSchedules =
				(staffSchedules[staffIndex]?.data as Schedule[]) || [];
			console.log("Raw currentSchedules:", currentSchedules);
			console.log(
				"Type of first schedule:",
				typeof currentSchedules[0],
				currentSchedules[0],
			);
			console.log(
				"Current schedules for staff:",
				staff.name,
				JSON.stringify(currentSchedules, null, 2),
			);

			// Find the schedule to update by matching date and time
			const scheduleToUpdateIndex = currentSchedules.findIndex((s) => {
				const startDate = parseISO(s.startTime);
				const endDate = parseISO(s.endTime);
				const scheduleDate = schedule.originalDate;

				return (
					isSameDay(startDate, scheduleDate) &&
					format(startDate, "HH:mm") === schedule.start &&
					format(endDate, "HH:mm") === schedule.end
				);
			});

			if (scheduleToUpdateIndex === -1) {
				console.error("Schedule to update not found");
				return;
			}

			// Create updated schedules array with IDs
			const updatedSchedules = currentSchedules.map((s) => ({
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				id: (s as any).id || crypto.randomUUID(),
				startTime: s.startTime,
				endTime: s.endTime,
			}));

			// Remove the old schedule
			const scheduleToRemoveIndex = updatedSchedules.findIndex((s) => {
				const startDate = parseISO(s.startTime);
				const endDate = parseISO(s.endTime);
				return (
					isSameDay(startDate, schedule.originalDate) &&
					format(startDate, "HH:mm") === schedule.start &&
					format(endDate, "HH:mm") === schedule.end
				);
			});

			if (scheduleToRemoveIndex !== -1) {
				updatedSchedules.splice(scheduleToRemoveIndex, 1);
			}

			// Add the new schedule
			const newDateStr = format(newDate, "yyyy-MM-dd");
			updatedSchedules.push({
				id: crypto.randomUUID(),
				startTime: new Date(`${newDateStr}T${newStart}:00`).toISOString(),
				endTime: new Date(`${newDateStr}T${newEnd}:00`).toISOString(),
			});

			// Validate all schedules
			for (const s of updatedSchedules) {
				if (new Date(s.startTime) >= new Date(s.endTime)) {
					console.error("Invalid schedule found:", s);
					return;
				}
			}

			console.log(
				"Sending updated schedules:",
				JSON.stringify(updatedSchedules, null, 2),
			);
			await assignMutation.mutateAsync({
				staffId: staff.id,
				data: updatedSchedules,
			});
		} catch (error) {
			console.error("Error in handleScheduleDrag:", error);
		}
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
				<div className="flex-1 space-y-4 p-4">
					<WeekNavigation
						currentWeekStart={currentWeekStart}
						setCurrentWeekStart={setCurrentWeekStart}
					/>

					<WeeklyCalendar
						weekDays={weekDays}
						selectedDates={selectedDates}
						toggleDate={toggleDate}
						getSchedulesForDay={getSchedulesForDay}
						isLoading={isSchedulesLoading}
						colorMap={colorMap}
						onScheduleDrag={handleScheduleDrag}
					/>
				</div>

				<Drawer
					open={isFiltersDrawerOpen}
					onClose={() => setIsFiltersDrawerOpen(false)}
				>
					<StaffFilterSidebar
						staffs={staffs}
						filteredStaffs={filteredStaffs}
						setFilteredStaffs={setFilteredStaffs}
						isLoading={staffsLoading}
					/>
				</Drawer>
			</AdminMain>
		</FeatureErrorBoundary>
	);
}

import { DateRangeInput, Drawer, IconButton, QuickActions, StaffSelector } from "@novahair/ui";
import { config, toISODate } from "@novahair/utils";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Filter, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AdminMain } from "~/app/layouts/admin-main";
import { Route } from "~/routes/appointments/table";
import { useAppointments } from "../hooks/use-appointments";
import { AppointmentTable } from "./table";


 
export const AppointmentAdminForm = () => {

	const { staffId} = useSearch({
    from: Route.fullPath,
	})
 	const navigate = useNavigate({ from: Route.fullPath })


	const { t } = useTranslation();
	const tenantId = config.tenantId;
	const { appointments, isLoading, refetch, to, setTo, from, setFrom } =
		useAppointments(config.tenantId);

 	const [isFiltersDrawerOpen, setIsFiltersDrawerOpen] = useState(false);
  	  
	function updateStaffId(id: string | null) {
		
 		navigate({
			search: (prev) => ({
				...prev,
				staffId: id ?? undefined,
			}),
		})	}
	return (
		 
		<AdminMain description={"list_of_appointments"} title={"appointments"} rightContent={
			<header className="flex gap-1 items-center">
				<div className="max-lg:hidden flex gap-1 items-center">
					
					<StaffSelector tenantId={tenantId} staffId={staffId} onSelect={updateStaffId} />
					<DateRangeInput
						from={new Date(from)}
						to={new Date(to)}
						onChange={({ from, to }) => {
							setFrom(toISODate(from));
							setTo(toISODate(to));
						}}
					/>
				</div>
				<IconButton className="lg:hidden" label={t("filter")} onClick={() => setIsFiltersDrawerOpen(true)} icon={<Filter />} variant="ghost"/>

			<QuickActions
					actions={[
					 {
						 id: "refresh",
						 label: t("refresh"),
						 icon: <RefreshCcw className="size-4" />,
						 onClick: () => refetch(),
					 }
				 ]}
				/>
			</header>
			 }>
  			 
				<Drawer open={isFiltersDrawerOpen} onOpenChange={setIsFiltersDrawerOpen} title={"filters"} description={"refine_your_appointment_list_using_filters"}>
				
					<StaffSelector label="filter_by_staff" tenantId={tenantId} staffId={staffId} onSelect={updateStaffId} />

					<DateRangeInput
						label="date"
						from={new Date(from)}
						to={new Date(to)}
						onChange={({ from, to }) => {
							setFrom(toISODate(from));
							setTo(toISODate(to));
						}}
					/>
				</Drawer>
 
			<AppointmentTable appointments={appointments} isLoading={isLoading} />
		</AdminMain>
	);
};

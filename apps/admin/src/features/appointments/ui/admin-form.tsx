import { DateRangeInput, Drawer, QuickActions, StaffSwitcher } from "@novahair/ui";
import { config, toISODate } from "@novahair/utils";
import { Filter, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AdminMain } from "~/app/layouts/admin-main";
import { useAppointments } from "../hooks/use-appointments";
import { AppointmentTable } from "./table";

export const AppointmentAdminForm = () => {

	const { t } = useTranslation();
	const tenantId = config.tenantId;
	const { appointments, isLoading, refetch, to, setTo, from, setFrom } =
		useAppointments(config.tenantId);

	const [staffId, setStaffId] = useState<string | undefined>(undefined);
	const [isFiltersDrawerOpen, setIsFiltersDrawerOpen] = useState(false);
  

	  

	return (
		 
		<AdminMain description={"list_of_appointments"} title={"appointments"} rightContent={
			<QuickActions
					actions={[
					 {
						 id: "filters",
						 label: t("filters"),
						 icon: <Filter className="size-4" />,
						 onClick: () => setIsFiltersDrawerOpen(true),
					 },
					 {
						 id: "refresh",
						 label: t("refresh"),
						 icon: <RefreshCcw className="size-4" />,
						 onClick: () => refetch(),
					 }
				 ]}
			 />
			 }>
 			<nav className=" gap-2 sm:justify-between">
 				<div className="side justify-end">
					<StaffSwitcher tenantId={tenantId} staffId={staffId} onSelect={setStaffId} />

					<DateRangeInput
						from={new Date(from)}
						to={new Date(to)}
						onChange={({ from, to }) => {
							setFrom(toISODate(from));
							setTo(toISODate(to));
						}}
					/>
				</div>
				<Drawer open={isFiltersDrawerOpen} onOpenChange={setIsFiltersDrawerOpen} title={"filters"} description={"refine_your_appointment_list_using_filters"}>
					<StaffSwitcher tenantId={tenantId} staffId={staffId} onSelect={setStaffId} />

					<DateRangeInput
						from={new Date(from)}
						to={new Date(to)}
						onChange={({ from, to }) => {
							setFrom(toISODate(from));
							setTo(toISODate(to));
						}}
					/>
				</Drawer>
			</nav>

			<AppointmentTable appointments={appointments} isLoading={isLoading} />
		</AdminMain>
	);
};

import { DateRangeInput, Drawer, QuickActions, StaffSwitcher } from "@novahair/ui";
import { Button } from "@novahair/ui/button";
import { config, toISODate } from "@novahair/utils";
import { Plus, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
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
		<>
 	 

			{/* Quick Actions for Mobile */}
			<div className="mb-4">
				<QuickActions
 					actions={[
						{
							id: "refresh",
							label: t("refresh"),
							icon: <RefreshCcw className="h-4 w-4" />,
							onClick: () => refetch(),
						}
					]}
				/>
			</div>

			{/* Desktop Navigation */}
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
				<Drawer >
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
		</>
	);
};

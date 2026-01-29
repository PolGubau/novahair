import { Button } from "@novahair/ui/button";
import { Drawer } from "@novahair/ui/drawer";
import { Input } from "@novahair/ui/input";
import { Plus, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { SummarizedAppointment } from "../domain/summarized-appointments";
import { useAppointments } from "../hooks/use-appointments";
import AppointmentCreationForm from "./creation-form";
import { AppointmentTable } from "./table";
import { DateRangeInput, StaffSwitcher } from "@novahair/ui";
import { config, toISODate } from "@novahair/utils";

export const AppointmentAdminForm = () => {

	const { t } = useTranslation();
	const tenantId = config.tenantId;
	const { appointments, isLoading, refetch, to, setTo, from, setFrom } =
		useAppointments(config.tenantId);

	const [staffId, setStaffId] = useState<string | undefined>(undefined);
	
	const [isFormOpened, setIsFormOpened] = useState(false);
	const [editing, setEditing] = useState<SummarizedAppointment | null>(null);

  

	const openCreate = () => {
		setEditing(null);
		setIsFormOpened(true);
	};

	return (
		<>
			<Drawer
				description="create_appointment_for_your_customers"
				onOpenChange={setIsFormOpened}
				open={isFormOpened}
				title="create_appointment"
			>
				<AppointmentCreationForm
					appointment={editing}
					onClose={() => {
						setIsFormOpened(false);
						setEditing(null);
					}}
				/>
			</Drawer>
			<nav className="flex gap-2 sm:justify-between max-sm:flex-col">
				<div className="side">
					<Button onClick={openCreate}>
						<Plus />
						{t("create")}
					</Button>

					<Button className="group" onClick={() => refetch()} variant="ghost">
						<div className="group-focus:rotate-90 transition-all">
							<RefreshCcw />
						</div>
						{t("refresh")}
					</Button>
				</div>
				<div className="side">
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
			</nav>
			<AppointmentTable appointments={appointments} isLoading={isLoading} />
		</>
	);
};

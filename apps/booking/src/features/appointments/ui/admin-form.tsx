import { t } from "i18next";
import { Plus, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { Button } from "@novahair/ui/button";
import { Drawer } from "@novahair/ui/drawer";
import { Input } from "@novahair/ui/input";
import type { SummarizedAppointment } from "../domain/summarized-appointments";
 import AppointmentCreationForm from "./creation-form";
import { AppointmentTable } from "./table";
import { useAppointments } from "../hooks/use-appointments";

export const AppointmentAdminForm = () => {
	const { appointments, isLoading, refetch, to, setTo, from, setFrom } =
		useAppointments();

	const [isFormOpened, setIsFormOpened] = useState(false);
	const [editing, setEditing] = useState<SummarizedAppointment | null>(null);

	const openCreate = () => {
		setEditing(null);
		setIsFormOpened(true);
	};

	return (
		<>
			<Drawer
				open={isFormOpened}
				onOpenChange={setIsFormOpened}
				title="create_appointment"
				description="create_appointment_for_your_customers"
			>
				<AppointmentCreationForm
					appointment={editing}
					onClose={() => {
						setIsFormOpened(false);
						setEditing(null);
					}}
				/>
			</Drawer>
			<nav className="side justify-between">
				<div className="side">
					<Button onClick={openCreate}>
						<Plus />
						{t("create")}
					</Button>

					<Button onClick={() => refetch()} variant="ghost" className="group">
						<div className="group-focus:rotate-90 transition-all">
							<RefreshCcw />
						</div>
						{t("refresh")}
					</Button>
				</div>
				<div className="side">
					<Input
						type="date"
						value={new Date(from).toISOString().split("T")[0]}
						onChange={(e) => setFrom(new Date(e.target.value).toISOString())}
						max={new Date(to).toISOString().split("T")[0]}
					/>
					<span className="mx-2">-</span>
					<Input
						min={new Date(from).toISOString().split("T")[0]}
						type="date"
						value={new Date(to).toISOString().split("T")[0]}
						onChange={(e) => setTo(new Date(e.target.value).toISOString())}
					/>
				</div>
			</nav>
			<AppointmentTable appointments={appointments} isLoading={isLoading} />
		</>
	);
};

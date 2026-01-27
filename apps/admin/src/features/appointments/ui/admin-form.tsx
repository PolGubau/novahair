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

export const AppointmentAdminForm = () => {
	const { t } = useTranslation();
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
			<nav className="side justify-between">
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
					<Input
						max={new Date(to).toISOString().split("T")[0]}
						onChange={(e) => setFrom(new Date(e.target.value).toISOString())}
						type="date"
						value={new Date(from).toISOString().split("T")[0]}
					/>
					<span className="mx-2">-</span>
					<Input
						min={new Date(from).toISOString().split("T")[0]}
						onChange={(e) => setTo(new Date(e.target.value).toISOString())}
						type="date"
						value={new Date(to).toISOString().split("T")[0]}
					/>
				</div>
			</nav>
			<AppointmentTable appointments={appointments} isLoading={isLoading} />
		</>
	);
};

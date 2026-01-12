import { createFileRoute } from "@tanstack/react-router";
import { t } from "i18next";
import { Plus, RefreshCcw } from "lucide-react";
import { useState } from "react";
import type { Appointment } from "~/features/appointments/domain/appointments";
import { appointmentFormRepository } from "~/features/appointments/infra/repository";
import { useLocalAppointments } from "~/features/appointments/models/use-local-appointments";
import { AppointmentCreationForm } from "~/features/appointments/ui/creation-form";
import { AppointmentTable } from "~/features/appointments/ui/table";
import { Button } from "~/shared/ui/button";
import { Drawer } from "~/shared/ui/drawer";
import { AdminMain } from "~/shared/ui/layouts/admin/admin-main";

export const Route = createFileRoute("/admin/appointments/table")({
	component: RouteComponent,
});

function RouteComponent() {
	const { appointments, isLoading } = useLocalAppointments();

	const [isFormOpened, setIsFormOpened] = useState(false);
	const [editing, setEditing] = useState<Appointment | null>(null);

	const openCreate = () => {
		setEditing(null);
		setIsFormOpened(true);
	};

	const openEdit = (appointment: Appointment) => {
		setEditing(appointment);
		setIsFormOpened(true);
	};

	const handleDelete = (appointment: Appointment) => {
		const index = appointments.findIndex(
			(a) =>
				a.customer.email === appointment.customer.email &&
				a.startsAt === appointment.startsAt,
		);
		if (index !== -1) {
			appointmentFormRepository.deleteLocal(index);
			window.location.reload();
		}
	};

	return (
		<AdminMain title={"appointments"} description={"list_of_appointments"}>
			<Drawer open={isFormOpened} onOpenChange={setIsFormOpened}>
				<AppointmentCreationForm
					appointment={editing}
					onClose={() => {
						setIsFormOpened(false);
						setEditing(null);
					}}
				/>
			</Drawer>
			<nav className="flex gap-2 items-center">
				<Button onClick={openCreate}>
					<Plus />
					{t("create")}
				</Button>

				<Button
					onClick={() => window.location.reload()}
					variant="ghost"
					className="group"
				>
					<div className="group-focus:rotate-90 transition-all">
						<RefreshCcw />
					</div>
					{t("refresh")}
				</Button>
			</nav>
			<AppointmentTable
				appointments={appointments}
				isLoading={isLoading}
				onEdit={openEdit}
				onDelete={handleDelete}
			/>
		</AdminMain>
	);
}

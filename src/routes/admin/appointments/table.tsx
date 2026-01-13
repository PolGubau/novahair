import { createFileRoute } from "@tanstack/react-router";
import { t } from "i18next";
import { Plus, RefreshCcw } from "lucide-react";
import { useState } from "react";
import type { SummarizedAppointment } from "~/features/appointments/domain/summarized-appointments";
import { appointmentFormRepository } from "~/features/appointments/infra/repository";
import { useLocalAppointments } from "~/features/appointments/models/use-local-appointments";
import { AppointmentAdminForm } from "~/features/appointments/ui/admin-form";
import { AppointmentCreationForm } from "~/features/appointments/ui/creation-form";
import { AppointmentTable } from "~/features/appointments/ui/table";
import { Button } from "~/shared/ui/button";
import { Drawer } from "~/shared/ui/drawer";
import { AdminMain } from "~/shared/ui/layouts/admin/admin-main";

export const Route = createFileRoute("/admin/appointments/table")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<AdminMain title={"appointments"} description={"list_of_appointments"}>
			<AppointmentAdminForm />
		</AdminMain>
	);
}

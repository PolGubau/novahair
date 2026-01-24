import { FeatureErrorBoundary } from "@novahair/ui/feature-error-boundary";
import { AdminMain } from "@novahair/ui/layouts/admin/admin-main";
import { createFileRoute } from "@tanstack/react-router";
import { AppointmentAdminForm } from "~/features/appointments/ui/admin-form";

export const Route = createFileRoute("/appointments/table")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<FeatureErrorBoundary featureName="Appointments">
			<AdminMain title={"appointments"} description={"list_of_appointments"}>
				<AppointmentAdminForm />
			</AdminMain>
		</FeatureErrorBoundary>
	);
}

import { FeatureErrorBoundary } from "@novahair/ui/feature-error-boundary";
import { AdminMain } from "~/app/layouts/admin-main";
import { createFileRoute } from "@tanstack/react-router";
import { AppointmentAdminForm } from "~/features/appointments/ui/admin-form";

export const Route = createFileRoute("/appointments/table")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<FeatureErrorBoundary featureName="appointments">
			<AdminMain description={"list_of_appointments"} title={"appointments"}>
				<AppointmentAdminForm />
			</AdminMain>
		</FeatureErrorBoundary>
	);
}

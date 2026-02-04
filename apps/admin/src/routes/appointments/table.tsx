import { FeatureErrorBoundary } from "@novahair/ui/feature-error-boundary";
import { createFileRoute } from "@tanstack/react-router";
import { AppointmentAdminForm } from "~/features/appointments/ui/admin-form";
import { z } from 'zod'

const appointmentsTableSchema = z.object({
  page: z.number().catch(1),
  staffId: z.uuid().optional(),
	from: z.iso.datetime().optional().default(() => {
		
		// first second of today
		const date = new Date();
		date.setHours(0,0,0,0);
		return date.toISOString();
	}),
	to: z.iso.datetime().optional().default(() => {
		// last second of today
		const date = new Date();
		date.setHours(22,59,59,999);
		return date.toISOString();
	}),
})
export const Route = createFileRoute("/appointments/table")({
	component: RouteComponent,
  validateSearch: appointmentsTableSchema,
});

function RouteComponent() {
	return (
		<FeatureErrorBoundary featureName="appointments">
				<AppointmentAdminForm />
 		</FeatureErrorBoundary>
	);
}

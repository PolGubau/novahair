import { FeatureErrorBoundary } from "@novahair/ui/feature-error-boundary";
import { createFileRoute } from "@tanstack/react-router";
import { AppointmentAdminForm } from "~/features/appointments/ui/admin-form";
import { z } from 'zod'

// Helper functions for default date ranges
const getStartOfToday = () => {
	const date = new Date();
	date.setHours(0, 0, 0, 0);
	return date.toISOString();
};

const getEndOfToday = () => {
	const date = new Date();
	date.setHours(23, 59, 59, 999);
	return date.toISOString();
};

const appointmentsTableSchema = z.object({
	// Page number for pagination - catch invalid values and default to 0
	pageIndex: z.number().catch(0),

	pageSize: z.number().catch(40),
	// Optional staff filter - if invalid UUID, becomes undefined
	staffId: z.uuid().optional().catch(undefined),

	// Date range filters - catch invalid dates and use today's range as fallback
	from: z.iso.datetime().catch(getStartOfToday),
	to: z.iso.datetime().catch(getEndOfToday),
});
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

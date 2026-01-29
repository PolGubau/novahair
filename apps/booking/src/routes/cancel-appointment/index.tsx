import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from '@tanstack/zod-adapter';
import { z } from "zod";
import { CancelAppointmentForm } from "~/features/appointment-cancellation";

const searchSchema = z.object({
	appointmentId: z.string(),
});

export const Route = createFileRoute("/cancel-appointment/")({
	component: CancelAppointment,
	validateSearch: zodValidator(searchSchema),
});

function CancelAppointment() {
	const { appointmentId } = Route.useSearch();

	return <CancelAppointmentForm appointmentId={appointmentId} />;
}
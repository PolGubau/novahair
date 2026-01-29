import { useAppointment, useAppointmentActions } from "@novahair/client";
import { useTenantId } from "~/shared/tenant";

const formatAppointmentDate = (dateString: string) => {
	return new Intl.DateTimeFormat(undefined, {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	}).format(new Date(dateString));
};

export const useCancelAppointment = (appointmentId: string) => {
	const tenantId = useTenantId();
	const { appointment, isLoading, error } = useAppointment(tenantId, appointmentId);
	const { remove } = useAppointmentActions(tenantId);

	const cancelAppointment = (onSuccess?: () => void) => {
		remove.mutate(appointmentId, {
			onSuccess,
		});
	};

	const formattedDate = appointment?.startAt ? formatAppointmentDate(appointment.startAt) : null;

	return {
		appointment,
		formattedDate,
		isLoading,
		error,
		cancelAppointment,
		isCancelling: remove.isPending,
		cancelError: remove.error,
	};
};
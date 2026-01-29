import {
	type Appointment,
	appointmentsRepository,
	type CreateAppointment,
} from "@novahair/client";
import { config, type ISODate } from "@novahair/utils";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useTenantId } from "~/shared/tenant";

type Params = {
	serviceId: string;
	onSuccess?: (email: string) => void;
	staffId: string | null;
};
type UseSubmitAppointmentResult = {
	isLoading: boolean;
	error: Error | null;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>, startAt: ISODate) => void;
	isSuccess: boolean;
};

/**
 * Hook para enviar el formulario de cita.
 * Recoge los campos del formulario (name, email, phone, notes) y llama a
 * `appointmentFormRepository.book` con el `serviceId` y `staffId` proporcionados.
 *
 * On success the created appointment is saved in a local react-query key
 * ['local-appointments'] and also persisted to localStorage so it can be
 * displayed to the user immediately.
 */
export const useSubmitAppointment = (
	params: Params | null,
): UseSubmitAppointmentResult => {
	const [isSuccess, setIsSuccess] = useState(false);
	const tenantId = useTenantId();

	const mutation = useMutation<Appointment, Error, CreateAppointment>({
		mutationFn: (props) => appointmentsRepository.create(tenantId, props),
		onSuccess(data, variables) {
			setIsSuccess(true);
			params?.onSuccess?.(variables.customer.email);
		},
		onError() {
			setIsSuccess(false);
		},
	});

	const handleSubmit = (
		e: React.FormEvent<HTMLFormElement>,
		startsAt: ISODate,
	) => {
		e.preventDefault();
		if (!params) {
			console.warn("No serviceId provided to useSubmitAppointment");
			return;
		}

		const form = e.currentTarget as HTMLFormElement;
		const fd = new FormData(form);

		const name = (fd.get("name") as string) || "";
		const email = (fd.get("email") as string) || "";
		const phone = (fd.get("phone") as string) || "";
		const notes = (fd.get("notes") as string) || "";

		const payload: CreateAppointment = {
			tenantId,
			serviceId: params.serviceId,
			staffId: params.staffId ?? null,
			customer: {
 				name,
				email,
				phone,
			},
			notes,
			startsAt,
		};

		mutation.mutate(payload);
	};

	return {
		isLoading: mutation.isPending,
		error: (mutation.error as Error) ?? null,
		handleSubmit,
		isSuccess,
	};
};

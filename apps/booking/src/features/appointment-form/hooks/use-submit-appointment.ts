import { client } from "@novahair/client";
import { config } from "@novahair/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { saveLocalAppointment } from "../../appointments/api/local-persistence";
import type { SummarizedAppointment } from "../../appointments/domain/summarized-appointments";
import type { BookAppointmentProps } from "../api/repository";
import { appointmentFormRepository } from "../api/repository";

type Params = {
	serviceId: string;
	onSuccess?: () => void;
	staffId: string | undefined;
};
type UseSubmitAppointmentResult = {
	isLoading: boolean;
	error: Error | null;
	handleSubmit: (
		e: React.FormEvent<HTMLFormElement>,
		start: string,
		end: string,
	) => void;
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
	const queryClient = useQueryClient();
	const [isSuccess, setIsSuccess] = useState(false);

	const mutation = useMutation<
		SummarizedAppointment,
		Error,
		BookAppointmentProps
	>({
		mutationFn: (props) => client.appointments.create(config.tenantId, props),
		onSuccess(data) {
			try {
				saveLocalAppointment(data);
			} catch {
				console.warn("Failed to persist appointment locally");
			}

			// Update react-query local cache so UI can react immediately
			queryClient.setQueryData<SummarizedAppointment[] | undefined>(
				["local-appointments"],
				(old) => [data].concat(old ?? []),
			);

			setIsSuccess(true);
			params?.onSuccess?.();
		},
		onError() {
			setIsSuccess(false);
		},
	});

	const handleSubmit = (
		e: React.FormEvent<HTMLFormElement>,
		start: string,
		end: string,
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

		const payload: BookAppointmentProps = {
			serviceId: params.serviceId,
			staffId: params.staffId ?? undefined,
			customer: {
				name,
				email,
				phone,
			},
			notes,
			start,
			end,
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

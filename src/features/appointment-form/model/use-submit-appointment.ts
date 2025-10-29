import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { saveLocalAppointment } from "../infra/local-persistence";
import type { BookAppointmentProps } from "../infra/repository";
import { appointmentFormRepository } from "../infra/repository";
import type { AppointmentDtoPost } from "../types/appointments-post.dto";

type Params = {
	serviceId: string;
	staffId?: string;
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
	createdAppointment: AppointmentDtoPost | null;
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
	const [createdAppointment, setCreatedAppointment] =
		useState<AppointmentDtoPost | null>(null);
	const [isSuccess, setIsSuccess] = useState(false);

	const mutation = useMutation<AppointmentDtoPost, Error, BookAppointmentProps>(
		{
			mutationFn: (props) => appointmentFormRepository.book(props),
			onSuccess(data) {
				try {
					saveLocalAppointment(data);
				} catch {
					console.warn("Failed to persist appointment locally");
				}

				// Update react-query local cache so UI can react immediately
				queryClient.setQueryData<AppointmentDtoPost[] | undefined>(
					["local-appointments"],
					(old) => [data].concat(old ?? []),
				);

				setCreatedAppointment(data);
				setIsSuccess(true);
			},
			onError() {
				setIsSuccess(false);
			},
		},
	);

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
			staffId: params.staffId,
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
		createdAppointment,
	};
};

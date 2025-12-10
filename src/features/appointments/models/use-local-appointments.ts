import { useQuery } from "@tanstack/react-query";
import type { Appointment } from "../domain/appointments";
import { appointmentFormRepository } from "../infra/repository";

type Response = {
	isLoading: boolean;
	error: Error | null;
	appointments: Appointment[];
};
type UseLocalAppointments = () => Response;

export const useLocalAppointments: UseLocalAppointments = () => {
	const { isLoading, error, data } = useQuery({
		queryKey: ["local-appointment"],
		staleTime: 1000 * 60 * 5, // 5 minutes
		queryFn: () => {
			return appointmentFormRepository.getLocal() || [];
		},
	});

	const appointments = data || [];
	return { isLoading, error, appointments };
};

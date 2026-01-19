import { useQuery } from "@tanstack/react-query";
import type { SummarizedAppointment } from "../domain/summarized-appointments";
import { appointmentFormRepository } from "../api/repository";

type Response = {
	isLoading: boolean;
	error: Error | null;
	refetch: () => void;
	appointments: SummarizedAppointment[];
};
type UseLocalAppointments = () => Response;

export const useLocalAppointments: UseLocalAppointments = () => {
	const { isLoading, error, data, refetch } = useQuery({
		queryKey: ["local-appointment"],
		staleTime: 1000 * 60 * 5, // 5 minutes
		queryFn: () => {
			return appointmentFormRepository.getLocal() || [];
		},
	});

	const appointments = data || [];
	return { isLoading, error, appointments, refetch };
};

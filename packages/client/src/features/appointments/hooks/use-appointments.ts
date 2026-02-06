import { useQuery } from "@tanstack/react-query";
import { appointmentsRepository, ListAppointmentsParams } from "../infra/repository";

export const useAppointments = (
	tenantId: string,
	params?: ListAppointmentsParams
) => {
	const { isLoading, error, data, refetch } = useQuery({
		queryKey: ["appointments", tenantId, params],
		staleTime: 1000 * 60 * 5, // 5 minutes
		queryFn: () => appointmentsRepository.list(tenantId, params),
	});
	const appointments = data || [];

	return { isLoading, error, appointments, refetch };
};

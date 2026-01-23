import { useQuery } from "@tanstack/react-query";
import { appointmentsRepository } from "../infra/repository";

export const useAppointment = (tenantId: string, id: string) => {
	const { isLoading, error, data, refetch } = useQuery({
		queryKey: ["appointment", tenantId, id],
		staleTime: 1000 * 60 * 5, // 5 minutes
		queryFn: () => appointmentsRepository.get(tenantId, id),
		enabled: !!id,
	});

	return { isLoading, error, appointment: data, refetch };
};

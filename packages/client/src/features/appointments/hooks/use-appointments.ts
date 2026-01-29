import { useQuery } from "@tanstack/react-query";
import { appointmentsRepository } from "../infra/repository";
import { ISODate } from "@novahair/utils";

export const useAppointments = (
	tenantId: string,
	params?: { from?: ISODate; to?: ISODate, tenantId?: string },
) => {
	const { isLoading, error, data, refetch } = useQuery({
		queryKey: ["appointments", tenantId, params],
		staleTime: 1000 * 60 * 5, // 5 minutes
		queryFn: () => appointmentsRepository.list(tenantId, params),
	});
	const appointments = data || [];

	return { isLoading, error, appointments, refetch };
};

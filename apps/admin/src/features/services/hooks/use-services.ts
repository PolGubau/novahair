import { queryKeys } from "@novahair/utils/lib/query-keys";
import { useQuery } from "@tanstack/react-query";
import { serviceRepository } from "../infra/repository";

export const useServices = () => {
	const { isLoading, error, data, refetch } = useQuery({
		queryKey: queryKeys.services.all,
		staleTime: 1000 * 60 * 30, // 30 minutes
		queryFn: serviceRepository.list,
	});
	const services = data || [];

	return { isLoading, error, services, refetch };
};

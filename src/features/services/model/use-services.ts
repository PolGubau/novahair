import { useQuery } from "@tanstack/react-query";
import { serviceRepository } from "../infra/repository";

export const useServices = () => {
	const { isLoading, error, data, refetch } = useQuery({
		queryKey: ["services"],
		staleTime: 1000 * 60 * 5, // 5 minutes
		queryFn: serviceRepository.listAll,
	});
	const services = data || [];

	return { isLoading, error, services, refetch };
};

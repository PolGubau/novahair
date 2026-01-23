import { useQuery } from "@tanstack/react-query";
import type { Service } from "../domain/service";
import { serviceRepository } from "../infra/repository";

/**
 * Hook to fetch a single service by ID
 * @param id - The ID of the service
 * @returns Object containing loading state, error, service data, and refetch function
 */
export const useService = (id: Service["id"]) => {
	const { isLoading, error, data, refetch } = useQuery({
		queryKey: ["service", id],
		staleTime: 1000 * 60 * 30, // 30 minutes
		queryFn: () => serviceRepository.get(id),
		enabled: !!id,
	});

	return { isLoading, error, service: data, refetch };
};

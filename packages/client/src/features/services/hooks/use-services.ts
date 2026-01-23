import { useQuery } from "@tanstack/react-query";
import { serviceRepository } from "../infra/repository";

/**
 * Hook to fetch all services for a specific tenant
 * @param tenantId - The ID of the tenant
 * @returns Object containing loading state, error, services array, and refetch function
 */
export const useServices = (tenantId: string) => {
	const { isLoading, error, data, refetch } = useQuery({
		queryKey: ["services", tenantId],
		staleTime: 1000 * 60 * 30, // 30 minutes
		queryFn: () => serviceRepository.list(tenantId),
	});
	const services = data || [];

	return { isLoading, error, services, refetch };
};

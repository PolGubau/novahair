import { useQuery } from "@tanstack/react-query";
import { customersRepository } from "../infra/repository";

/**
 * Hook to fetch all customers for a specific tenant
 * @param tenantId - The ID of the tenant
 * @returns Object containing loading state, error, customers array, and refetch function
 */
export const useCustomers = (tenantId: string) => {
	const { isLoading, error, data, refetch } = useQuery({
		queryKey: ["customers", tenantId],
		staleTime: 1000 * 60 * 30, // 30 minutes
		queryFn: () => customersRepository.list(tenantId),
	});
	const customers = data || [];

	return { isLoading, error, customers, refetch };
};

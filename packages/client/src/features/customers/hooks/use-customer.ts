import { useQuery } from "@tanstack/react-query";
import { customersRepository } from "../infra/repository";

export const useCustomer = (tenantId: string, id: string) => {
	const { isLoading, error, data, refetch } = useQuery({
		queryKey: ["customer", tenantId, id],
		staleTime: 1000 * 60 * 30, // 30 minutes
		queryFn: () => customersRepository.get(tenantId, id),
		enabled: !!id,
	});

	return { isLoading, error, customer: data, refetch };
};

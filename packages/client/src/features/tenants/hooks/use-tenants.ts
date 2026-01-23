import { useQuery } from "@tanstack/react-query";
import { tenantsRepository } from "../infra/repository";

export const useTenants = () => {
	const { isLoading, error, data, refetch } = useQuery({
		queryKey: ["tenants"],
		staleTime: 1000 * 60 * 30, // 30 minutes
		queryFn: () => tenantsRepository.list(),
	});
	const tenants = data || [];

	return { isLoading, error, tenants, refetch };
};

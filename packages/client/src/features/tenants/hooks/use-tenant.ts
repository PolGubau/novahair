import { useQuery } from "@tanstack/react-query";
import { tenantsRepository } from "../infra/repository";

export const useTenant = (id: string) => {
	const { isLoading, error, data, refetch } = useQuery({
		queryKey: ["tenant", id],
		staleTime: 1000 * 60 * 30, // 30 minutes
		queryFn: () => tenantsRepository.get(id),
		enabled: !!id,
	});

	return { isLoading, error, tenant: data, refetch };
};

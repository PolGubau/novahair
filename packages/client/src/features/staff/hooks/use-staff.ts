import { useQuery } from "@tanstack/react-query";
import { staffRepository } from "../infra/repository";

export const useStaff = (tenantId: string, id: string) => {
	const { isLoading, error, data, refetch } = useQuery({
		queryKey: ["staff", tenantId, id],
		staleTime: 1000 * 60 * 30, // 30 minutes
		queryFn: () => staffRepository.get(id),
		enabled: !!id,
	});

	return { isLoading, error, staff: data, refetch };
};

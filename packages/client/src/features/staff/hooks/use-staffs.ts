import { useQuery } from "@tanstack/react-query";
import { staffRepository } from "../infra/repository";

export const useStaffs = (tenantId: string) => {
	const { isLoading, error, data, refetch } = useQuery({
		queryKey: ["staffs", tenantId],
		staleTime: 1000 * 60 * 30, // 30 minutes
		queryFn: () => staffRepository.list(tenantId),
	});
	const staffs = data || [];

	return { isLoading, error, staffs, refetch };
};

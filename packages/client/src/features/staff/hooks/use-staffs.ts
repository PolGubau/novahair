import { useQuery } from "@tanstack/react-query";
import { staffRepository } from "../infra/repository";


type Params = {
	hasService?: string;
};
export const useStaffs = (tenantId: string, params?: Params) => {
	const { isLoading, error, data, refetch } = useQuery({
		queryKey: ["staffs", tenantId, params],
		staleTime: 1000 * 60 * 30, // 30 minutes
		queryFn: () => staffRepository.list(tenantId,params),
	});
	const staffs = data || [];

	return { isLoading, error, staffs, refetch };
};

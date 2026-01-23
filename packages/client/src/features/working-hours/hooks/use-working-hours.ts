import { useQuery } from "@tanstack/react-query";
import { workingHoursRepository } from "../infra/repository";

export const useWorkingHours = (tenantId: string, staffId: string) => {
	const { isLoading, error, data, refetch } = useQuery({
		queryKey: ["working-hours", tenantId, staffId],
		staleTime: 1000 * 60 * 30, // 30 minutes
		queryFn: () => workingHoursRepository.getByStaff(tenantId, staffId),
		enabled: !!staffId,
	});
	const workingHours = data || [];

	return { isLoading, error, workingHours, refetch };
};

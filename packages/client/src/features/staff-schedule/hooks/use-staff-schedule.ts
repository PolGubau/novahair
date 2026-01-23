import { useQuery } from "@tanstack/react-query";
import { staffScheduleRepository } from "../infra/repository";

export const useStaffSchedule = (tenantId: string, staffId: string) => {
	const { isLoading, error, data, refetch } = useQuery({
		queryKey: ["staff-schedule", tenantId, staffId],
		staleTime: 1000 * 60 * 30, // 30 minutes
		queryFn: () => staffScheduleRepository.getByStaff(tenantId, staffId),
		enabled: !!staffId,
	});
	const schedule = data || [];

	return { isLoading, error, schedule, refetch };
};

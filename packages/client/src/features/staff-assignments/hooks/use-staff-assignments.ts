import { useQuery } from "@tanstack/react-query";
import { staffAssignmentsRepository } from "../infra/repository";

export const useStaffAssignments = (tenantId: string, staffId: string) => {
	const { isLoading, error, data, refetch } = useQuery({
		queryKey: ["staff-assignments", tenantId, staffId],
		staleTime: 1000 * 60 * 30, // 30 minutes
		queryFn: () => staffAssignmentsRepository.getByStaff(tenantId, staffId),
		enabled: !!staffId,
	});

	return { isLoading, error, assignments: data, refetch };
};

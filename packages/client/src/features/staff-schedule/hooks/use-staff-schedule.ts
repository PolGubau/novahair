import { useQuery } from "@tanstack/react-query";
import type { ISODate } from "@novahair/utils";
import { staffScheduleRepository } from "../infra/repository";

export const useStaffSchedule = (
	tenantId: string,
	staffId: string,
	from?: ISODate,
	to?: ISODate,
) => {
	const { isLoading, error, data, refetch } = useQuery({
		queryKey: ["staff-schedule", tenantId, staffId, from, to],
		staleTime: 1000 * 60 * 5, // 5 minutes
		queryFn: () => staffScheduleRepository.getByStaff(tenantId, staffId, from, to),
		enabled: !!staffId,
	});
	const schedule = data || [];

	return { isLoading, error, schedule, refetch };
};

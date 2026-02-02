import type { ISODate } from "@novahair/utils";
import { useQuery } from "@tanstack/react-query";
import { scheduleRepository } from "../infra/repository";

export const useSchedule = (
	staffId: string,
	from?: ISODate,
	to?: ISODate,
) => {
	const { isLoading, error, data, refetch } = useQuery({
		queryKey: ["staff-schedule", from, to],
		staleTime: 1000 * 60 * 5, // 5 minutes
		queryFn: () => scheduleRepository.get(from, to),
		enabled: !!staffId,
	});
	const schedule = data || [];

	return { isLoading, error, schedule, refetch };
};

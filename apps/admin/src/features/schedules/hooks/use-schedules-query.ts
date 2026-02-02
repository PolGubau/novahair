import { staffScheduleRepository } from "@novahair/client";
import type { ISODate } from "@novahair/utils";
import { useQuery } from "@tanstack/react-query";

export function useSchedulesQuery(
	tenantId: string,
	from: ISODate,
	to: ISODate,
	staffIds?: string[],
	enabled = true,
) {
	return useQuery({
		queryKey: ["staff-schedules", tenantId, from, to, staffIds],
		queryFn: () =>
			staffScheduleRepository.getByTenant(
				tenantId,
				from,
				to,
				staffIds?.length ? staffIds : undefined,
			),
		enabled,
	});
}

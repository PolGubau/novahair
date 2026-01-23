import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateScheduleDto } from "../../../types";
import { staffScheduleRepository } from "../infra/repository";

export const useStaffScheduleActions = (tenantId: string, staffId: string) => {
	const qc = useQueryClient();

	const assign = useMutation({
		mutationFn: (data: CreateScheduleDto) =>
			staffScheduleRepository.assign(tenantId, staffId, data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["staff-schedule", tenantId, staffId] });
		},
	});

	return {
		assign,
	};
};

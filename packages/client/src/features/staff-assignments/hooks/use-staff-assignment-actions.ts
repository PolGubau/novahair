import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AssignServicesToStaffDto } from "../../../types";
import { staffAssignmentsRepository } from "../infra/repository";

export const useStaffAssignmentActions = (
	tenantId: string,
	staffId: string,
) => {
	const qc = useQueryClient();

	const assign = useMutation({
		mutationFn: (data: AssignServicesToStaffDto) =>
			staffAssignmentsRepository.assign(tenantId, staffId, data),
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: ["staff-assignments", tenantId, staffId],
			});
		},
	});

	const unassign = useMutation({
		mutationFn: (serviceId: string) =>
			staffAssignmentsRepository.unassign(tenantId, staffId, serviceId),
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: ["staff-assignments", tenantId, staffId],
			});
		},
	});

	return {
		assign,
		unassign,
	};
};

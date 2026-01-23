import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
	CreateWorkingHoursDto,
	UpdateWorkingHoursDto,
} from "../../../types";
import { workingHoursRepository } from "../infra/repository";

export const useWorkingHourActions = (tenantId: string, staffId: string) => {
	const qc = useQueryClient();

	const create = useMutation({
		mutationFn: (data: CreateWorkingHoursDto) =>
			workingHoursRepository.create(tenantId, data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["working-hours", tenantId, staffId] });
		},
	});

	const update = useMutation({
		mutationFn: ({ id, data }: { id: string; data: UpdateWorkingHoursDto }) =>
			workingHoursRepository.update(tenantId, id, data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["working-hours", tenantId, staffId] });
		},
	});

	const remove = useMutation({
		mutationFn: (id: string) => workingHoursRepository.delete(tenantId, id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["working-hours", tenantId, staffId] });
		},
	});

	return {
		create,
		update,
		remove,
	};
};

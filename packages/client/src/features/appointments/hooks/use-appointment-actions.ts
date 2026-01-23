import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
	CreateAppointmentDto,
	UpdateAppointmentStatusDto,
} from "../../../types";
import { appointmentsRepository } from "../infra/repository";

export const useAppointmentActions = (tenantId: string) => {
	const qc = useQueryClient();

	const create = useMutation({
		mutationFn: (data: CreateAppointmentDto) =>
			appointmentsRepository.create(tenantId, data),
	});

	const updateStatus = useMutation({
		mutationFn: ({
			id,
			data,
		}: { id: string; data: UpdateAppointmentStatusDto }) =>
			appointmentsRepository.updateStatus(tenantId, id, data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["appointments", tenantId] });
		},
	});

	const remove = useMutation({
		mutationFn: (id: string) => appointmentsRepository.delete(tenantId, id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["appointments", tenantId] });
		},
	});

	return {
		create,
		updateStatus,
		remove,
	};
};

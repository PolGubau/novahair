import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateScheduleDto, UpdateScheduleDto } from "../../../types";
import type { Staff } from "../../staff/domain/staff";
import type { Tenant } from "../../tenants";
import { staffScheduleRepository } from "../infra/repository";

export const useStaffScheduleActions = (tenantId: Tenant["id"]) => {
	const qc = useQueryClient();

	const update = useMutation({
		mutationFn: ({
			data,
			staffId,
		}: { data: UpdateScheduleDto; staffId: Staff["id"] }) =>
			staffScheduleRepository.update(tenantId, staffId, data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["staff-schedule", tenantId] });
		},
	});
	const create = useMutation({
		mutationFn: ({
			data,
			staffId,
		}: { data: CreateScheduleDto; staffId: Staff["id"] }) =>
			staffScheduleRepository.create(tenantId, staffId, data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["staff-schedule", tenantId] });
		},
	});

	return { create, update };
};

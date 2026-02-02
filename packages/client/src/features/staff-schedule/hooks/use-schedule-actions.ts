import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateScheduleDto, UpdateScheduleDto } from "../../../types";
import type { Staff } from "../../staff/domain/staff";
import type { Tenant } from "../../tenants";
import { scheduleRepository } from "../infra/repository";

export const useScheduleActions = (tenantId: Tenant["id"]) => {
	const qc = useQueryClient();

	const update = useMutation({
		mutationFn: ({
			data,
			staffId,
		}: { data: UpdateScheduleDto[]; staffId: Staff["id"] }) =>
			scheduleRepository.update(staffId, data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["staff-schedule", tenantId] });
		},
	});

	type CreateParams = {
		data: CreateScheduleDto[];
		staffId: Staff["id"];
	};
	const create = useMutation({
		mutationFn: ({ data }: CreateParams) =>
			scheduleRepository.create(data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["staff-schedule", tenantId] });
		},
	});

	return { create, update };
};

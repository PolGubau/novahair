import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateTenantDto, UpdateTenantDto } from "../../../types";
import { tenantsRepository } from "../infra/repository";

export const useTenantActions = () => {
	const qc = useQueryClient();

	const create = useMutation({
		mutationFn: (data: CreateTenantDto) => tenantsRepository.create(data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["tenants"] });
		},
	});

	const update = useMutation({
		mutationFn: ({ id, data }: { id: string; data: UpdateTenantDto }) =>
			tenantsRepository.update(id, data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["tenants"] });
		},
	});

	const remove = useMutation({
		mutationFn: (id: string) => tenantsRepository.delete(id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["tenants"] });
		},
	});

	return {
		create,
		update,
		remove,
	};
};

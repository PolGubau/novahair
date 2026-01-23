import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ServiceCreateDTO } from "../domain/service.create.dto";
import { serviceRepository } from "../infra/repository";

/**
 * Hook providing mutation actions for services
 * @param tenantId - The ID of the tenant
 * @returns Object containing create, update, and remove mutations
 */
export const useServiceActions = (tenantId: string) => {
	const qc = useQueryClient();

	const create = useMutation({
		mutationFn: (data: ServiceCreateDTO) => serviceRepository.create(data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["services", tenantId] });
		},
	});

	const update = useMutation({
		mutationFn: ({ id, data }: { id: string; data: ServiceCreateDTO }) =>
			serviceRepository.update(id, data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["services", tenantId] });
		},
	});

	const remove = useMutation({
		mutationFn: (id: string) => serviceRepository.delete(id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["services", tenantId] });
		},
	});

	return {
		create,
		update,
		remove,
	};
};

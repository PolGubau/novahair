import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateCustomerDto, UpdateCustomerDto } from "../../../types";
import { customersRepository } from "../infra/repository";

/**
 * Hook providing mutation actions for customers
 * @param tenantId - The ID of the tenant
 * @returns Object containing create, update, and remove mutations
 */
export const useCustomerActions = (tenantId: string) => {
	const qc = useQueryClient();

	const create = useMutation({
		mutationFn: (data: CreateCustomerDto) =>
			customersRepository.create(tenantId, data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["customers", tenantId] });
		},
	});

	const update = useMutation({
		mutationFn: ({ id, data }: { id: string; data: UpdateCustomerDto }) =>
			customersRepository.update(tenantId, id, data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["customers", tenantId] });
		},
	});

	const remove = useMutation({
		mutationFn: (id: string) => customersRepository.delete(tenantId, id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["customers", tenantId] });
		},
	});

	return {
		create,
		update,
		remove,
	};
};

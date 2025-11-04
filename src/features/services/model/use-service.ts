import { useMutation, useQueryClient } from "@tanstack/react-query";
import { constants } from "~/shared/constants";
import type { Service } from "../../services/domain/service";
import type { EditableServiceCreateDTO } from "../domain/service.create.dto";
import { serviceRepository } from "../infra/repository";

export const useService = () => {
	const qc = useQueryClient();

	const create = useMutation({
		mutationFn: (payload: EditableServiceCreateDTO) =>
			serviceRepository.create({
				name: payload.name,
				description: payload.description,
				priceCents: payload.priceCents,
				durationMin: payload.durationMin,
				bufferBefore: payload.bufferBefore ?? 0,
				bufferAfter: payload.bufferAfter ?? 0,
				active: true,
				tenantId: constants.tenantId,
			}),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["services"] });
		},
	});

	const update = useMutation({
		mutationFn: ({
			id,
			payload,
		}: {
			id: string;
			payload: EditableServiceCreateDTO;
		}) =>
			serviceRepository.update(id, {
				name: payload.name,
				description: payload.description,
				priceCents: payload.priceCents,
				durationMin: payload.durationMin,
				bufferBefore: payload.bufferBefore ?? 0,
				bufferAfter: payload.bufferAfter ?? 0,
				active: true,
				tenantId: constants.tenantId,
			}),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["services"] });
		},
	});

	const remove = useMutation({
		mutationFn: (id: string) => serviceRepository.remove(id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["services"] });
		},
	});

	return {
		create,
		update,
		remove,
	};
};

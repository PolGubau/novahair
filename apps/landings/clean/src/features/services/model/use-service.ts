import { config } from "@novahair/utils/constants";
import { useRepositoryMutation } from "@novahair/utils/hooks/use-repository-mutation";
import { queryKeys } from "@novahair/utils/lib/query-keys";
import type { EditableServiceCreateDTO } from "../domain/service.create.dto";
import { serviceRepository } from "../infra/repository";

// Helper para convertir payload editable a DTO completo
const toServiceDTO = (payload: EditableServiceCreateDTO) => ({
	name: payload.name,
	imageUrl: payload.imageUrl,
	description: payload.description,
	priceCents: payload.priceCents,
	durationMin: payload.durationMin,
	bufferBefore: payload.bufferBefore ?? 0,
	bufferAfter: payload.bufferAfter ?? 0,
	active: true,
	tenantId: config.tenantId,
});

export const useService = () => {
	const create = useRepositoryMutation(
		(payload: EditableServiceCreateDTO) =>
			serviceRepository.create(toServiceDTO(payload)),
		queryKeys.services.all,
	);

	const update = useRepositoryMutation(
		({ id, payload }: { id: string; payload: EditableServiceCreateDTO }) =>
			serviceRepository.update(id, toServiceDTO(payload)),
		queryKeys.services.all,
	);

	const remove = useRepositoryMutation(
		(id: string) => serviceRepository.delete(id),
		queryKeys.services.all,
	);

	return {
		create,
		update,
		remove,
	};
};

import { buildApiUrl, genericFetch } from "@novahair/utils";
import { toService } from "../../..";
import type { ServiceDto } from "../../../types";
import type { Service } from "../domain/service";
import type { ServiceCreateDTO } from "../domain/service.create.dto";

export type ServiceRepository = {
	list: (tenantId: string) => Promise<Service[]>;
	get: (id: string) => Promise<Service>;
	create: (data: ServiceCreateDTO) => Promise<Service>;
	update: (id: string, data: ServiceCreateDTO) => Promise<Service>;
	delete: (id: string) => Promise<void>;
};

export const serviceRepository: ServiceRepository = {
	list: async (tenantId) => {
		const dto = await genericFetch<ServiceDto[]>(
			buildApiUrl(`services/tenants/${tenantId}`),
		);
		return dto.map(toService);
	},

	get: async (id) => {
		const dto = await genericFetch<ServiceDto>(buildApiUrl(`services/${id}`));
		return toService(dto);
	},

	create: async (data) => {
		const dto = await genericFetch<ServiceDto>(buildApiUrl("services"), {
			method: "POST",
			body: JSON.stringify(data),
		});
		return toService(dto);
	},

	update: async (id, data) => {
		const dto = await genericFetch<ServiceDto>(buildApiUrl(`services/${id}`), {
			method: "PUT",
			body: JSON.stringify(data),
		});
		return toService(dto);
	},

	delete: async (id) => {
		await genericFetch(buildApiUrl(`services/${id}`), {
			method: "DELETE",
		});
	},
};

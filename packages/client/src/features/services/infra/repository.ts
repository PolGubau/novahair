import type { AbstractRepository } from "@novahair/utils";
import { config } from "@novahair/utils/constants";
import { client } from "../../../api";
import type { Service } from "../domain/service";
import type { ServiceCreateDTO } from "../domain/service.create.dto";

export type ServiceRepository = AbstractRepository<Service, ServiceCreateDTO>;

export const serviceRepository: ServiceRepository = {
	list: async () => {
		return client.services.list(config.tenantId);
	},

	get: async (id) => {
		return client.services.get(id);
	},

	create: async (payload) => {
		return client.services.create(payload);
	},

	update: async (id, payload) => {
		await client.services.update(id, payload);
		return client.services.get(id); // Re-fetch
	},

	delete: async (id) => {
		await client.services.delete(id);
	},
};

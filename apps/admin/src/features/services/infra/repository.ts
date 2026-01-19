import { buildApiUrl, buildTenantUrl } from "@novahair/utils/lib/api-utils";
import { genericFetch } from "@novahair/utils/lib/generic-fetch";
import type { Service } from "../../services/domain/service";
import type { ServiceCreateDTO } from "../domain/service.create.dto";

export type ServiceRepository = {
	list: () => Promise<Service[]>;
	get: (id: string) => Promise<Service | null>;
	create: (payload: ServiceCreateDTO) => Promise<Service>;
	update: (id: string, payload: Partial<ServiceCreateDTO>) => Promise<Service>;
	delete: (id: string) => Promise<void>;
};

export const serviceRepository: ServiceRepository = {
	list: async () => {
		return genericFetch<Service[]>(buildTenantUrl("services"));
	},

	get: async (id) => {
		return genericFetch<Service>(buildTenantUrl(`services/${id}`));
	},

	create: async (payload) => {
		return genericFetch<Service>(buildApiUrl("services"), {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});
	},

	update: async (id, payload) => {
		return genericFetch<Service>(buildApiUrl(`services/${id}`), {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});
	},

	delete: async (id) => {
		await genericFetch(buildApiUrl(`services/${id}`), { method: "DELETE" });
	},
};

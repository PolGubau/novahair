import type { Service } from "../../services/domain/service";
import type { ServiceCreateDTO } from "../domain/service.create.dto";
import { api } from "./api";

export type ServiceRepository = {
	listAll: () => Promise<Service[]>;
	create: (payload: ServiceCreateDTO) => Promise<Service>;
	update: (id: string, payload: ServiceCreateDTO) => Promise<Service>;
	remove: (id: string) => Promise<{ success?: boolean } | undefined>;
	get: (id: Service["id"]) => Promise<Service | null>;
};

export const serviceRepository: ServiceRepository = {
	listAll: api.list,
	create: api.create,
	update: api.update,
	remove: api.delete,
	get: api.get,
};

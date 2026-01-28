import type { AbstractRepository } from "@novahair/utils";
import type { Service } from "../../services/domain/service";
import type { ServiceCreateDTO } from "../domain/service.create.dto";
import { api } from "./api";

export type ServiceRepository = AbstractRepository<Service, ServiceCreateDTO>;

// {
// 	listAll: () => Promise<Service[]>;
// 	create: (payload: ServiceCreateDTO) => Promise<Service>;
// 	update: (id: string, payload: ServiceCreateDTO) => Promise<Service>;
// 	delete: (id: string) => Promise<{ success?: boolean } | undefined>;
// 	get: (id: Service["id"]) => Promise<Service | null>;
// };

export const serviceRepository: ServiceRepository = {
	list: api.list,
	create: api.create,
	update: api.update,
	delete: api.delete,
	get: api.get,
};

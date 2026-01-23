import { buildApiUrl, genericFetch } from "@novahair/utils";
import { toTenant } from "../../..";
import type {
	CreateTenantDto,
	TenantDto,
	UpdateTenantDto,
} from "../../../types";
import type { Tenant } from "../domain/tenant";

export type TenantsRepository = {
	list: () => Promise<Tenant[]>;
	get: (id: string) => Promise<Tenant>;
	create: (data: CreateTenantDto) => Promise<Tenant>;
	update: (id: string, data: UpdateTenantDto) => Promise<Tenant>;
	delete: (id: string) => Promise<void>;
};

export const tenantsRepository: TenantsRepository = {
	list: async () => {
		const dto = await genericFetch<TenantDto[]>(buildApiUrl("tenants"));
		return dto.map(toTenant);
	},

	get: async (id) => {
		const dto = await genericFetch<TenantDto>(buildApiUrl(`tenants/${id}`));
		return toTenant(dto);
	},

	create: async (data) => {
		const dto = await genericFetch<TenantDto>(buildApiUrl("tenants"), {
			method: "POST",
			body: JSON.stringify(data),
		});
		return toTenant(dto);
	},

	update: async (id, data) => {
		const dto = await genericFetch<TenantDto>(buildApiUrl(`tenants/${id}`), {
			method: "PUT",
			body: JSON.stringify(data),
		});
		return toTenant(dto);
	},

	delete: async (id) => {
		await genericFetch(buildApiUrl(`tenants/${id}`), {
			method: "DELETE",
		});
	},
};

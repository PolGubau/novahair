import { buildApiUrl, buildTenantUrl } from "@novahair/utils/lib/api-utils";
import { genericFetch } from "@novahair/utils/lib/generic-fetch";
import type { AbstractRepository } from "@novahair/utils/types/common";
import type { Staff, StaffCreateDto } from "../domain/staff";

export type StaffRepository = AbstractRepository<Staff, StaffCreateDto>;

export const staffRepository: StaffRepository = {
	list: async () => {
		return genericFetch<Staff[]>(buildTenantUrl("staff"));
	},

	get: async (id) => {
		return genericFetch<Staff>(buildApiUrl(`staff/${id}`));
	},

	create: async (payload) => {
		return genericFetch<Staff>(buildApiUrl("staff"), {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});
	},

	update: async (id, payload) => {
		return genericFetch<Staff>(buildApiUrl(`staff/${id}`), {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});
	},

	delete: async (id) => {
		await genericFetch(buildApiUrl(`staff/${id}`), { method: "DELETE" });
	},
};

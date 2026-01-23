import { buildApiUrl, genericFetch } from "@novahair/utils";
import type { AbstractRepository } from "@novahair/utils/types/common";
import { toStaff } from "../../../mappers";
import type { StaffDto, UpdateStaffDto } from "../../../types";
import type { Staff, StaffCreateDto } from "../domain/staff";

export type StaffRepository = Omit<
	AbstractRepository<Staff, StaffCreateDto, UpdateStaffDto>,
	"list"
> & {
	list: (tenantId: string) => Promise<Staff[]>;
};

export const staffRepository: StaffRepository = {
	list: async (tenantId) => {
		const dtos = await genericFetch<StaffDto[]>(
			buildApiUrl(`staff/tenant/${tenantId}`),
		);
		return dtos.map(toStaff);
	},

	get: async (id) => {
		const dto = await genericFetch<StaffDto>(buildApiUrl(`staff/${id}`));
		return toStaff(dto);
	},

	create: async (data) => {
		const dto = await genericFetch<StaffDto>(buildApiUrl("staff"), {
			method: "POST",
			body: JSON.stringify(data),
			headers: { "Content-Type": "application/json" },
		});
		return toStaff(dto);
	},

	update: async (id, data) =>
		genericFetch(buildApiUrl(`staff/${id}`), {
			method: "PUT",
			body: JSON.stringify(data),
			headers: { "Content-Type": "application/json" },
		}),

	delete: (id) =>
		genericFetch(buildApiUrl(`staff/${id}`), { method: "DELETE" }),
};

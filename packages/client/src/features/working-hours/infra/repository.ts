import { buildApiUrl, genericFetch } from "@novahair/utils";
import { toWorkingHours } from "../../..";
import type {
	CreateWorkingHoursDto,
	UpdateWorkingHoursDto,
	WorkingHoursDto,
} from "../../../types";
import type { WorkingHours } from "../domain/working-hours";

export type WorkingHoursRepository = {
	getByStaff: (tenantId: string, staffId: string) => Promise<WorkingHours[]>;
	create: (
		tenantId: string,
		data: CreateWorkingHoursDto,
	) => Promise<WorkingHours>;
	update: (
		tenantId: string,
		id: string,
		data: UpdateWorkingHoursDto,
	) => Promise<WorkingHours>;
	delete: (tenantId: string, id: string) => Promise<void>;
};

export const workingHoursRepository: WorkingHoursRepository = {
	getByStaff: async (tenantId, staffId) => {
		const dto = await genericFetch<WorkingHoursDto[]>(
			buildApiUrl(`tenants/${tenantId}/staff/${staffId}/working-hours`),
		);
		return dto.map(toWorkingHours);
	},

	create: async (tenantId, data) => {
		const dto = await genericFetch<WorkingHoursDto>(
			buildApiUrl(`tenants/${tenantId}/working-hours`),
			{
				method: "POST",
				body: JSON.stringify(data),
			},
		);
		return toWorkingHours(dto);
	},

	update: async (tenantId, id, data) => {
		const dto = await genericFetch<WorkingHoursDto>(
			buildApiUrl(`tenants/${tenantId}/working-hours/${id}`),
			{
				method: "PUT",
				body: JSON.stringify(data),
			},
		);
		return toWorkingHours(dto);
	},

	delete: async (tenantId, id) => {
		await genericFetch(buildApiUrl(`tenants/${tenantId}/working-hours/${id}`), {
			method: "DELETE",
		});
	},
};

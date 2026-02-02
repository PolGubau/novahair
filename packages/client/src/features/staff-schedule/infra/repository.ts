import { buildApiUrl, genericFetch, type ISODate } from "@novahair/utils";
import { Staff, Tenant, toSchedule } from "../../..";
import type {
	CreateScheduleDto,
	ScheduleDto,
	UpdateScheduleDto,
} from "../../../types";
import type { Schedule } from "../domain/schedule";

export type StaffScheduleRepository = {
	getByStaff: (
		tenantId: Tenant["id"],
		staffId: Staff["id"],
		from?: ISODate,
		to?: ISODate,
	) => Promise<Schedule[]>;
	getByTenant: (
		tenantId: Tenant["id"],
		from?: ISODate,
		to?: ISODate,
		staffIds?: Staff["id"][],
	) => Promise<Schedule[]>;
	create: (
		tenantId: Tenant["id"],
		staffId: Staff["id"],
		data: CreateScheduleDto[],
	) => Promise<void>;
	update: (
		tenantId: Tenant["id"],
		staffId: Staff["id"],
		data: UpdateScheduleDto[],
	) => Promise<void>;
};

export const staffScheduleRepository: StaffScheduleRepository = {
	getByStaff: async (tenantId, staffId, from, to) => {
		const params = new URLSearchParams();
		if (from) params.append("from", from);
		if (to) params.append("to", to);
		const queryString = params.toString();
		const url = queryString
			? `tenants/${tenantId}/staff/${staffId}/schedule?${queryString}`
			: `tenants/${tenantId}/staff/${staffId}/schedule`;
		const dto = await genericFetch<ScheduleDto[]>(buildApiUrl(url));
		return dto.map(toSchedule);
	},

	getByTenant: async (tenantId, from, to, staffIds) => {
		const params = new URLSearchParams();
		if (from) params.append("from", from);
		if (to) params.append("to", to);
		if (staffIds?.length) {
			for (const staffId of staffIds) {
				params.append("staffId", staffId);
			}
		}
		const queryString = params.toString();
		const url = queryString
			? `tenants/${tenantId}/schedule?${queryString}`
			: `tenants/${tenantId}/schedule`;
		const dto = await genericFetch<ScheduleDto[]>(buildApiUrl(url));
		return dto.map(toSchedule);
	},

	create: async (tenantId, staffId, data) => {
		await genericFetch(
			buildApiUrl(`tenants/${tenantId}/staff/${staffId}/schedule`),
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			},
		);
	},
	update: async (tenantId, staffId, data) => {
		await genericFetch(
			buildApiUrl(`tenants/${tenantId}/staff/${staffId}/schedule`),
			{
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			},
		);
	},
};

import { buildApiUrl, genericFetch } from "@novahair/utils";
import { toSchedule } from "../../..";
import type {
	CreateScheduleDto,
	ScheduleDto,
	UpdateScheduleDto,
} from "../../../types";
import type { Schedule } from "../domain/schedule";

export type StaffScheduleRepository = {
	getByStaff: (tenantId: string, staffId: string) => Promise<Schedule[]>;
	create: (
		tenantId: string,
		staffId: string,
		data: CreateScheduleDto,
	) => Promise<void>;
	update: (
		tenantId: string,
		staffId: string,
		data: UpdateScheduleDto,
	) => Promise<void>;
};

export const staffScheduleRepository: StaffScheduleRepository = {
	getByStaff: async (tenantId, staffId) => {
		const dto = await genericFetch<ScheduleDto[]>(
			buildApiUrl(`tenants/${tenantId}/staff/${staffId}/schedule`),
		);
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

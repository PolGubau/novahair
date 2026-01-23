import { buildApiUrl, genericFetch } from "@novahair/utils";
import { toSchedule } from "../../..";
import type { CreateScheduleDto, ScheduleDto } from "../../../types";
import type { Schedule } from "../domain/schedule";

export type StaffScheduleRepository = {
	getByStaff: (tenantId: string, staffId: string) => Promise<Schedule[]>;
	assign: (
		tenantId: string,
		staffId: string,
		data: CreateScheduleDto,
	) => Promise<void>;
};

export const staffScheduleRepository: StaffScheduleRepository = {
	getByStaff: async (tenantId, staffId) => {
		const dto = await genericFetch<ScheduleDto[]>(
			buildApiUrl(`tenants/${tenantId}/staff/${staffId}/schedule`),
		);
		return dto.map(toSchedule);
	},

	assign: async (tenantId, staffId, data) => {
		await genericFetch(
			buildApiUrl(`tenants/${tenantId}/staff/${staffId}/schedule`),
			{
				method: "POST",
				body: JSON.stringify(data),
			},
		);
	},
};

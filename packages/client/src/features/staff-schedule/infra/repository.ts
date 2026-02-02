import { buildApiUrl, genericFetch, type ISODate } from "@novahair/utils";
import { Staff, toSchedule } from "../../..";
import type {
	CreateScheduleDto,
	ScheduleDto,
	UpdateScheduleDto,
} from "../../../types";
import type { Schedule } from "../domain/schedule";

export type ScheduleRepository = {
	get: (
 		from?: ISODate,
		to?: ISODate,
		staffIds?: Staff["id"][],
	) => Promise<Schedule[]>;
	create: (
  		data: CreateScheduleDto[],
	) => Promise<void>;
	update: (
 		staffId: Staff["id"],
		data: UpdateScheduleDto[],
	) => Promise<void>;
};

export const scheduleRepository: ScheduleRepository = {
	 

	get: async (from, to, staffIds) => {
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
			? `schedules?${queryString}`
			: `schedules`;
		const dto = await genericFetch<ScheduleDto[]>(buildApiUrl(url));
		return dto.map(toSchedule);
	},

	create: async (data) => {
		await genericFetch(
			buildApiUrl(`schedules`),
			{
				method: "POST",
 				body: JSON.stringify(data),
			},
		);
	},
	update: async (staffId, data) => {
		await genericFetch(
			buildApiUrl(`schedules?staffId=${staffId}`),
			{
				method: "PUT",
 				body: JSON.stringify(data),
			},
		);
	},
};

import { buildApiUrl, genericFetch, ISODate } from "@novahair/utils";
import { toAppointment } from "../../..";
import type {
	AppointmentDto,
	CreateAppointmentDto,
	UpdateAppointmentStatusDto,
} from "../../../types";
import type { Appointment } from "../domain/appointment";

export type AppointmentsRepository = {
	list: (
		tenantId: string,
		params?: { from?: ISODate; to?: ISODate },
	) => Promise<Appointment[]>;
	get: (tenantId: string, id: string) => Promise<Appointment>;
	create: (
		tenantId: string,
		data: CreateAppointmentDto,
	) => Promise<Appointment>;
	updateStatus: (
		tenantId: string,
		id: string,
		data: UpdateAppointmentStatusDto,
	) => Promise<Appointment>;
	delete: (tenantId: string, id: string) => Promise<void>;
};

export const appointmentsRepository: AppointmentsRepository = {
	list: async (tenantId, params) => {
		const dto = await genericFetch<AppointmentDto[]>(
			buildApiUrl(`tenants/${tenantId}/appointments`, params),
		);
		return dto.map(toAppointment);
	},

	get: async (tenantId, id) => {
		const dto = await genericFetch<AppointmentDto>(
			buildApiUrl(`tenants/${tenantId}/appointments/${id}`),
		);
		return toAppointment(dto);
	},

	create: async (tenantId, data) => {
		const dto = await genericFetch<AppointmentDto>(
			buildApiUrl(`tenants/${tenantId}/appointments`),
			{
				method: "POST",
				body: JSON.stringify(data),
			},
		);
		return toAppointment(dto);
	},

	updateStatus: async (tenantId, id, data) => {
		const dto = await genericFetch<AppointmentDto>(
			buildApiUrl(`tenants/${tenantId}/appointments/${id}/status`),
			{
				method: "PATCH",
				body: JSON.stringify(data),
			},
		);
		return toAppointment(dto);
	},

	delete: async (tenantId, id) => {
		await genericFetch(buildApiUrl(`tenants/${tenantId}/appointments/${id}`), {
			method: "DELETE",
		});
	},
};

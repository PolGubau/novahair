import { buildTenantUrl } from "@novahair/utils/lib/api-utils";
import { genericFetch } from "@novahair/utils/lib/generic-fetch";
import type { Appointment } from "../domain/appointment";
import type { SummarizedAppointment } from "../domain/summarized-appointments";

export type ListAppointmentsParams = {
	from: string;
	to: string;
};

export type CreateAppointmentParams = Omit<SummarizedAppointment, "id">;

export type UpdateAppointmentParams = Partial<CreateAppointmentParams>;

export type AppointmentRepository = {
	list: (params: ListAppointmentsParams) => Promise<Appointment[]>;
	create: (data: CreateAppointmentParams) => Promise<SummarizedAppointment>;
	update: (id: string, data: UpdateAppointmentParams) => Promise<Appointment>;
	delete: (id: string) => Promise<void>;
};

export const appointmentRepository: AppointmentRepository = {
	create: async (data) => {
		const url = buildTenantUrl("appointments");
		return genericFetch<SummarizedAppointment>(url, {
			body: JSON.stringify(data),
			headers: { "Content-Type": "application/json" },
			method: "POST",
		});
	},

	delete: async (id) => {
		const url = buildTenantUrl(`appointments/${id}`);
		await genericFetch(url, { method: "DELETE" });
	},
	list: async ({ from, to }) => {
		const url = buildTenantUrl("appointments", { from, to });
		return genericFetch<Appointment[]>(url);
	},

	update: async (id, data) => {
		const url = buildTenantUrl(`appointments/${id}`);
		return genericFetch<Appointment>(url, {
			body: JSON.stringify(data),
			headers: { "Content-Type": "application/json" },
			method: "PUT",
		});
	},
};

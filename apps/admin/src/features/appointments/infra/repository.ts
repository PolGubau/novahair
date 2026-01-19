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
	list: async ({ from, to }) => {
		const url = buildTenantUrl("appointments", { from, to });
		return genericFetch<Appointment[]>(url);
	},

	create: async (data) => {
		const url = buildTenantUrl("appointments");
		return genericFetch<SummarizedAppointment>(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
	},

	update: async (id, data) => {
		const url = buildTenantUrl(`appointments/${id}`);
		return genericFetch<Appointment>(url, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
	},

	delete: async (id) => {
		const url = buildTenantUrl(`appointments/${id}`);
		await genericFetch(url, { method: "DELETE" });
	},
};

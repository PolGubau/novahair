import type { Service, Staff } from "@novahair/client";
import type {
	Customer,
	SummarizedAppointment,
} from "./summarized-appointments";

export type Appointment = Pick<SummarizedAppointment, "startsAt"> & {
	id: string;
	staff: Staff;
	customer: Customer & {
		id: string;
		tenantId: string;
		notes: null;
		createdAt: string;
	};
	service: Service;
	endsAt: string;
};

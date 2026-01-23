import type { Customer } from "../../customers";

export type AppointmentStatus =
	| "PENDING"
	| "CONFIRMED"
	| "CANCELLED"
	| "COMPLETED";

export interface Appointment {
	id: string;
	tenantId: string;
	serviceId: string;
	staffId: string;
	customer: Customer;
	startsAt: string;
	status: AppointmentStatus;
	notes: string;
}

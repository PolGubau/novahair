import type { ISODate } from "@novahair/utils";
import type { Customer } from "../../customers";
import type { Service } from "../../services";
import type { Staff } from "../../staff";

export type AppointmentStatus =
	| "PENDING"
	| "CONFIRMED"
	| "CANCELLED"
	| "COMPLETED";

export interface Appointment {
	id: string;
	staff: Staff;
	customer: Customer;
	service: Service;
	startAt: ISODate;
	endsAt: ISODate;
	notes: string | null;
	status: AppointmentStatus;
}

export type CreateAppointment = {
	tenantId: string;
	serviceId: string;
	staffId: string | null;
	customer: {
 		name: string;
		email: string;
		phone: string;
	};
	startsAt: ISODate;
	notes: string;
};

import type { Service } from "~/features/services/domain/service";
import type { Staff } from "~/features/staff/domain/staff";
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

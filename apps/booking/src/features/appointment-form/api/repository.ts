import type { SummarizedAppointment } from "../../appointments/domain/summarized-appointments";
import type { AvailableDay } from "../domain/available-day";
import type { Slot } from "../domain/slot";
import { api } from "./api";
export type GetAvailableDaysProps = {
	serviceId: string;
	staffId?: string;
	from?: string;
	to?: string;
};
export type GetSlotsProps = {
	serviceId: string;
	staffId?: string;
	from: string;
};

export type BookAppointmentProps = {
	serviceId: string;
	staffId?: string;
	customer: {
		name: string;
		email: string;
		phone: string;
	};
	notes: string;
	start: string;
	end: string;
};

export type AppointmentFormRepository = {
	listAvailableDays: (props: GetAvailableDaysProps) => Promise<AvailableDay[]>;
	listSlots: (props: GetSlotsProps) => Promise<Slot[]>;
	book: (props: BookAppointmentProps) => Promise<SummarizedAppointment>;
};

export const appointmentFormRepository: AppointmentFormRepository = {
	listAvailableDays: api.listAvailableDays,
	listSlots: api.listSlots,
	book: api.bookAppointment,
};

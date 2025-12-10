import type { AvailableDay } from "~/features/appointment-form/domain/available-day";
import type { Slot } from "~/features/appointment-form/domain/slot";
import type { Appointment } from "~/features/appointments/domain/appointments";
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
	getLocal: () => Appointment[];
	saveLocal: (appointment: Appointment) => void;
	listSlots: (props: GetSlotsProps) => Promise<Slot[]>;
	book: (props: BookAppointmentProps) => Promise<Appointment>;
};

export const appointmentFormRepository: AppointmentFormRepository = {
	listAvailableDays: api.listAvailableDays,
	listSlots: api.listSlots,
	book: api.bookAppointment,
	getLocal: api.getLocalAppointments,
	saveLocal: api.saveLocalAppointment,
};

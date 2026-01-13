import type { AvailableDay } from "~/features/appointment-form/domain/available-day";
import type { Slot } from "~/features/appointment-form/domain/slot";
import type { SummarizedAppointment } from "~/features/appointments/domain/summarized-appointments";
import type { Appointment } from "../domain/appointment";
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

export type ListAppointmentsProps = {
	from: string;
	to: string;
};

export type ListAppointments = (
	props: ListAppointmentsProps,
) => Promise<Appointment[]>;

export type AppointmentFormRepository = {
	listAvailableDays: (props: GetAvailableDaysProps) => Promise<AvailableDay[]>;
	getLocal: () => SummarizedAppointment[];
	saveLocal: (appointment: SummarizedAppointment) => void;
	deleteLocal: (index: number) => void;
	listSlots: (props: GetSlotsProps) => Promise<Slot[]>;
	book: (props: BookAppointmentProps) => Promise<SummarizedAppointment>;
	listAppointments: ListAppointments;
};

export const appointmentFormRepository: AppointmentFormRepository = {
	listAppointments: api.listAppointments,
	listAvailableDays: api.listAvailableDays,
	listSlots: api.listSlots,
	book: api.bookAppointment,
	getLocal: api.getLocalAppointments,
	saveLocal: api.saveLocalAppointment,
	deleteLocal: api.deleteLocalAppointment,
};

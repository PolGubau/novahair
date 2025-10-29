import type { AvailableDay } from "../domain/available-day";
import type { Service } from "../domain/service";
import type { Slot } from "../domain/slot";
import type { AppointmentDtoPost } from "../types/appointments-post.dto";
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
	day: string;
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
	listServices: () => Promise<Service[]>;
	listAvailableDays: (props: GetAvailableDaysProps) => Promise<AvailableDay[]>;
	listSlots: (props: GetSlotsProps) => Promise<Slot[]>;
	book: (props: BookAppointmentProps) => Promise<AppointmentDtoPost>;
};

export const appointmentFormRepository: AppointmentFormRepository = {
	listServices: api.listServices,
	listAvailableDays: api.listAvailableDays,
	listSlots: api.listSlots,
	book: api.bookAppointment,
};

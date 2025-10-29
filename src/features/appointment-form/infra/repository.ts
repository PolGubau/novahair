import type { AvailableDay } from "../domain/available-day";
import type { Service } from "../domain/service";
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
	day: string;
};

export type AppointmentFormRepository = {
	listServices: () => Promise<Service[]>;
	listAvailableDays: (props: GetAvailableDaysProps) => Promise<AvailableDay[]>;
	listSlots: (props: GetSlotsProps) => Promise<Slot[]>;
};

export const appointmentFormRepository: AppointmentFormRepository = {
	listServices: api.listServices,
	listAvailableDays: api.listAvailableDays,
	listSlots: api.listSlots,
};

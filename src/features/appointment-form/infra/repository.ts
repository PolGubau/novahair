import type { GetAvailableDaysProps } from "~/shared/constants";
import type { AvailableDay } from "../domain/available-day";
import type { Service } from "../domain/service";
import { listAvailableDays, listServices } from "./api";

export type AppointmentFormRepository = {
	listServices: () => Promise<Service[]>;
	listAvailableDays: (props: GetAvailableDaysProps) => Promise<AvailableDay[]>;
};

export const appointmentFormRepository: AppointmentFormRepository = {
	listServices,
	listAvailableDays,
};

import type { AvailableDay } from "~/features/appointment-form/domain/available-day";
import type { Slot } from "~/features/appointment-form/domain/slot";
import type { Appointment } from "~/features/appointments/domain/appointments";
import { endpoints } from "~/shared/constants";
import {
	getLocalAppointments,
	saveLocalAppointment,
} from "./local-persistence";
import type {
	BookAppointmentProps,
	GetAvailableDaysProps,
	GetSlotsProps,
} from "./repository";

const { getAvailableDays, getSlots } = endpoints;

export async function genericFetch<ResponseType>(
	url: string,
	options?: RequestInit,
): Promise<ResponseType> {
	const response = await fetch(url, options);
	if (!response.ok) {
		const errorBody = await response.text();
		throw new Error(
			`Error fetching ${url}: ${response.status} ${response.statusText} - ${errorBody}`,
		);
	}
	return await (response.json() as Promise<ResponseType>);
}

export async function listAvailableDays(props: GetAvailableDaysProps) {
	const url = getAvailableDays(props);
	return genericFetch<AvailableDay[]>(url) || [];
}

export async function listSlots(props: GetSlotsProps) {
	const url = getSlots(props);

	return genericFetch<Slot[]>(url) || [];
}

export async function bookAppointment(props: BookAppointmentProps) {
	const body: Appointment = {
		serviceId: props.serviceId,
		staffId: props.staffId,
		customer: {
			name: props.customer.name,
			email: props.customer.email,
			phone: props.customer.phone,
		},
		startsAt: props.start,
		notes: props.notes,
	};

	const url = endpoints.bookAppointment;
	const stringifiedBody = JSON.stringify(body);

	return genericFetch<Appointment>(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: stringifiedBody,
	});
}

export const api = {
	listAvailableDays,
	listSlots,
	getLocalAppointments,
	saveLocalAppointment,
	bookAppointment,
};

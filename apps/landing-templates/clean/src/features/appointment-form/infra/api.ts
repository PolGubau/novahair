import { endpoints } from "~/shared/constants";
import type { SummarizedAppointment } from "../../appointments/domain/summarized-appointments";
import type { AvailableDay } from "../domain/available-day";
import type { Slot } from "../domain/slot";
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
	const body: SummarizedAppointment = {
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

	return genericFetch<SummarizedAppointment>(url, {
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
	bookAppointment,
};

import { constants, endpoints } from "~/shared/constants";
import type { AvailableDay } from "../domain/available-day";
import type { Service } from "../domain/service";
import type { Slot } from "../domain/slot";
import type { AppointmentDtoPost } from "../types/appointments-post.dto";
import type {
	BookAppointmentProps,
	GetAvailableDaysProps,
	GetSlotsProps,
} from "./repository";

const { getServices, getAvailableDays, getSlots } = endpoints;

async function genericFetch<ResponseType>(
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

export async function listServices() {
	return genericFetch<Service[]>(getServices) || [];
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
	const body: AppointmentDtoPost = {
		tenantId: constants.tenantId,
		serviceId: props.serviceId,
		staffId: props.staffId,
		customer: {
			tenantId: constants.tenantId,
			name: props.customer.name,
			email: props.customer.email,
			phone: props.customer.phone,
			notes: "",
		},
		startsAt: new Date().toISOString(),
		endsAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // +30 minutes
		priceCents: 5000,
		notes: props.notes,
	};

	const url = endpoints.bookAppointment;

	return genericFetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});
}

export const api = {
	listServices,
	listAvailableDays,
	listSlots,
};

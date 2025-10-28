import { endpoints, type GetAvailableDaysProps } from "~/shared/constants";
import type { AvailableDay } from "../domain/available-day";
import type { Service } from "../domain/service";

const { getServices, getAvailableDays } = endpoints;

async function genericFetch<ResponseType>(url: string): Promise<ResponseType> {
	const response = await fetch(url);
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

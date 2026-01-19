import { endpoints, genericFetch } from "@novahair/utils";
import type { Service } from "../../services/domain/service";
import type { ServiceRepository } from "./repository";

const { getServices, services } = endpoints;

export async function list() {
	return genericFetch<Service[]>(getServices) || [];
}
export const getService: ServiceRepository["get"] = (id) => {
	return genericFetch<Service>(`${getServices}/${id}`) || null;
};

export async function create(payload: Partial<Service>) {
	const url = services;
	const res = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(
			`Error creating service: ${res.status} ${res.statusText} - ${text}`,
		);
	}
	return (await res.json()) as Service;
}

export async function update(id: string, payload: Partial<Service>) {
	// Backend may expect PUT/delete at /services/:id; we append to the getServices base
	const url = `${services}/${id}`;
	const res = await fetch(url, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(
			`Error updating service ${id}: ${res.status} ${res.statusText} - ${text}`,
		);
	}
	return (await res.json()) as Service;
}

export async function deleteService(id: string) {
	const url = `${services}/${id}`;
	const res = await fetch(url, {
		method: "DELETE",
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(
			`Error deleting service ${id}: ${res.status} ${res.statusText} - ${text}`,
		);
	}
}

export const api = {
	list,
	create,
	update,
	delete: deleteService,
	get: getService,
};

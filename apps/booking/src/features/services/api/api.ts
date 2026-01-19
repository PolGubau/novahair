import { genericFetch } from "~/features/appointment-form/api/api";
import { getTenantId } from "~/shared/tenant";
import { endpoints } from "~/shared/constants";
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
	const tenantId = getTenantId();
	
	const headers: HeadersInit = { "Content-Type": "application/json" };
	if (tenantId) {
		headers["X-Tenant-ID"] = tenantId;
	}
	
	const res = await fetch(url, {
		method: "POST",
		headers,
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
	const tenantId = getTenantId();
	
	const headers: HeadersInit = { "Content-Type": "application/json" };
	if (tenantId) {
		headers["X-Tenant-ID"] = tenantId;
	}
	
	const res = await fetch(url, {
		method: "PUT",
		headers,
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
	const tenantId = getTenantId();
	
	const headers: HeadersInit = {};
	if (tenantId) {
		headers["X-Tenant-ID"] = tenantId;
	}
	
	const res = await fetch(url, {
		method: "DELETE",
		headers,
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(
			`Error deleting service ${id}: ${res.status} ${res.statusText} - ${text}`,
		);
	}
	// some APIs return no body on delete
	try {
		return (await res.json()) as { success?: boolean };
	} catch {
		return { success: true };
	}
}

export const api = {
	list,
	create,
	update,
	delete: deleteService,
	get: getService,
};

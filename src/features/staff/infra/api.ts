import { genericFetch } from "~/features/appointment-form/infra/api";
import { endpoints } from "~/shared/constants";
import type { Staff } from "../domain/staff";
import type { StaffRepository } from "./repository";

const { list_staffs: baseGetUrl, staff: baseUrl } = endpoints;

export async function list() {
	return genericFetch<Staff[]>(baseGetUrl) || [];
}
export const getOne: StaffRepository["get"] = (id) => {
	return genericFetch<Staff>(`${baseUrl}/${id}`) || null;
};

export async function create(payload: Partial<Staff>) {
	const url = baseUrl;
	const res = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(
			`Error creating staff: ${res.status} ${res.statusText} - ${text}`,
		);
	}
	return (await res.json()) as Staff;
}

export async function update(id: string, payload: Partial<Staff>) {
	// Backend may expect PUT/delete at /staffs/:id; we append to the getStaffs base
	const url = `${baseUrl}/${id}`;
	const res = await fetch(url, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(
			`Error updating staff ${id}: ${res.status} ${res.statusText} - ${text}`,
		);
	}
	return (await res.json()) as Staff;
}

export async function deleteService(id: string) {
	const url = `${baseUrl}/${id}`;
	const res = await fetch(url, {
		method: "DELETE",
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(
			`Error deleting staff ${id}: ${res.status} ${res.statusText} - ${text}`,
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
	get: getOne,
};

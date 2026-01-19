import type { Staff, StaffCreateDto } from "../domain/staff";
import { api } from "./api";

export type StaffRepository = {
	listAll: () => Promise<Staff[]>;
	create: (payload: StaffCreateDto) => Promise<Staff>;
	update: (id: string, payload: StaffCreateDto) => Promise<Staff>;
	remove: (id: string) => Promise<{ success?: boolean } | undefined>;
	get: (id: Staff["id"]) => Promise<Staff | null>;
};

export const staffRepository: StaffRepository = {
	listAll: api.list,
	create: api.create,
	update: api.update,
	remove: api.delete,
	get: api.get,
};

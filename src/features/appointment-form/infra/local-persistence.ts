import type { AppointmentDtoPost } from "../types/appointments-post.dto";

const STORAGE_KEY = "local-appointments";

export function saveLocalAppointment(appointment: AppointmentDtoPost) {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		const arr: AppointmentDtoPost[] = raw ? JSON.parse(raw) : [];
		const next = [appointment].concat(arr);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
	} catch {
		// Ignore storage errors (private mode, quota, etc.)
	}
}

export function getLocalAppointments(): AppointmentDtoPost[] {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? (JSON.parse(raw) as AppointmentDtoPost[]) : [];
	} catch {
		return [];
	}
}

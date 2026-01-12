import type { Appointment } from "../domain/appointments";

const STORAGE_KEY = "local-appointments";

export function saveLocalAppointment(appointment: Appointment) {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		const arr: Appointment[] = raw ? JSON.parse(raw) : [];
		const next = [appointment].concat(arr);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
	} catch {
		// Ignore storage errors (private mode, quota, etc.)
	}
}

export function getLocalAppointments(): Appointment[] {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? (JSON.parse(raw) as Appointment[]) : [];
	} catch {
		return [];
	}
}

export function deleteLocalAppointment(index: number) {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		const arr: Appointment[] = raw ? JSON.parse(raw) : [];
		const next = arr.filter((_, i) => i !== index);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
	} catch {
		// Ignore storage errors
	}
}

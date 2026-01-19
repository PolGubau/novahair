import type { SummarizedAppointment } from "../domain/summarized-appointments";

const STORAGE_KEY = "local-appointments";

export function saveLocalAppointment(appointment: SummarizedAppointment) {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		const arr: SummarizedAppointment[] = raw ? JSON.parse(raw) : [];
		const next = [appointment].concat(arr);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
	} catch {
		// Ignore storage errors (private mode, quota, etc.)
	}
}

export function getLocalAppointments(): SummarizedAppointment[] {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? (JSON.parse(raw) as SummarizedAppointment[]) : [];
	} catch {
		return [];
	}
}

export function deleteLocalAppointment(index: number) {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		const arr: SummarizedAppointment[] = raw ? JSON.parse(raw) : [];
		const next = arr.filter((_, i) => i !== index);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
	} catch {
		// Ignore storage errors
	}
}

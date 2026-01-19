import type { Staff } from "~/features/staff/domain/staff";

export interface Slot {
	staff: Staff[];
	start: string;
	end: string;
}

import type { Staff } from "@novahair/client";

export interface Slot {
	staff: Staff[];
	start: string;
	end: string;
}

import type { Staff } from "@novahair/client";

export interface AvailabilitySlot {
	staff: Staff[];
	start: string;
	startLocal: string;
	endLocal: string;
	end: string;
}

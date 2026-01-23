import type { Staff } from "@novahair/client";
import type { ISODate } from "@novahair/utils";

export interface AvailabilitySlot {
	staff: Staff[];
	start: ISODate;
	startLocal: string;
	endLocal: string;
	end: ISODate;
}

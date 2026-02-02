import type { ISODate } from "@novahair/utils";
import type { Staff } from "../../staff";

export interface Schedule {
	startTime: ISODate;
	endTime: ISODate;
	id: string;
	staff: Staff;
}

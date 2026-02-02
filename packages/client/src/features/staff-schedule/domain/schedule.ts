import type { ISODate } from "@novahair/utils";

export interface Schedule {
	startTime: ISODate;
	endTime: ISODate;
	id: string;
	staffId?: string;
}

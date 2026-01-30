import { type ISODate, buildApiUrl, genericFetch } from "@novahair/utils";
import { toAvailabilitySlot } from "../../..";
import type { AvailabilitySlotDto } from "../../../types";
import type { AvailabilityDay } from "../domain/day";
import type { AvailabilitySlot } from "../domain/slot";

export type AvailabilityRepository = {
	getSlots: (
		tenantId: string,
		params: { serviceId: string; staffId?: string; from: ISODate },
	) => Promise<AvailabilitySlot[]>;
	getDays: (
		tenantId: string,
		params: { serviceId: string; staffId?: string; from: ISODate; to: ISODate },
	) => Promise<AvailabilityDay[]>;
};

export const availabilityRepository: AvailabilityRepository = {
	getSlots: async (tenantId, params) => {
		const dto = await genericFetch<AvailabilitySlotDto[]>(
			buildApiUrl(`tenants/${tenantId}/availability`, params),
		);
		return dto.map(toAvailabilitySlot);
	},

	getDays: (tenantId, params) =>
		genericFetch<AvailabilityDay[]>( 
			buildApiUrl(`tenants/${tenantId}/availability/days`,params),
		),
};

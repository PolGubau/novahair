import { toISODate } from "@novahair/utils";
import { useQuery } from "@tanstack/react-query";
import type { AvailabilitySlot } from "../domain/slot";
import { availabilityRepository } from "../infra/repository";

type Props = {
	tenantId: string;
	serviceId: string;
	staffId?: string;
	date: Date;
};
type Response = {
	isLoading: boolean;
	error: Error | null;
	slots: AvailabilitySlot[];
};
type UseSlots = (props: Props) => Response;

export const useSlots: UseSlots = ({ tenantId, serviceId, date, staffId }) => {
	const from = toISODate(date);

	const { isLoading, error, data } = useQuery({
		queryKey: ["slot", serviceId, staffId, from, tenantId],
		staleTime: 1000 * 60 * 5, // 5 minutes
		queryFn: () => {
			return (
				availabilityRepository.getSlots(tenantId, {
					serviceId,
					staffId,
					from,
				}) || []
			);
		},
	});

	const slots = data || [];
	return { isLoading, error, slots };
};

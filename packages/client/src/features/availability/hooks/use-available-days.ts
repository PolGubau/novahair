import { useQuery } from "@tanstack/react-query";
import type { AvailabilityDay } from "../domain/day";
import { availabilityRepository } from "../infra/repository";

type Props = {
	tenantId: string;
	serviceId: string;
	from: string;
	to: string;
};
type Response = {
	isLoading: boolean;
	error: Error | null;
	refetch: () => void;
	days: AvailabilityDay[];
};
type UseAvailableDays = (props: Props) => Response;

export const useAvailableDays: UseAvailableDays = ({
	tenantId,
	serviceId,
	from,
	to,
}) => {
	const { isLoading, error, data, refetch } = useQuery({
		queryKey: ["available-days", serviceId, from, to, tenantId],
		staleTime: 1000 * 60 * 5, // 5 minutes

		queryFn: () => {
			return (
				availabilityRepository.getDays(tenantId, {
					serviceId,
					from,
					to,
				}) || []
			);
		},
	});

	const days = data || [];
	return { isLoading, error, days, refetch };
};

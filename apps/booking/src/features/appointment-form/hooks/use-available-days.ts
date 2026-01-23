import { client } from "@novahair/client";
import { config } from "@novahair/utils";
import { useQuery } from "@tanstack/react-query";
import { appointmentFormRepository } from "../api/repository";
import type { AvailableDay } from "../domain/available-day";
import { getMonthBoundaries } from "../utils/get-month-boundaries";

type Props = {
	serviceId: string;
	currentDate: Date;
};
type Response = {
	isLoading: boolean;
	error: Error | null;
	refetch: () => void;
	days: AvailableDay[];
};
type UseAvailableDays = (props: Props) => Response;

export const useAvailableDays: UseAvailableDays = ({
	serviceId,
	currentDate,
}) => {
	const { isLoading, error, data, refetch } = useQuery({
		queryKey: ["available-days", serviceId, currentDate],
		staleTime: 1000 * 60 * 5, // 5 minutes

		queryFn: () => {
			const { start, end } = getMonthBoundaries(currentDate);

			return (
				client.availability.getDays(config.tenantId, {
					serviceId,
					from: start.toISOString(),
					to: end.toISOString(),
				}) || []
			);
		},
	});

	const days = data || [];
	return { isLoading, error, days, refetch };
};

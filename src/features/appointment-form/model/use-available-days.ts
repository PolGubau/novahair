import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { AvailableDay } from "../domain/available-day";
import { appointmentFormRepository } from "../infra/repository";
import { getMonthBoundaries } from "../utils/get-month-boundaries";

type Props = {
	serviceId: string;
	currentDate: Date;
};
type Response = {
	isLoading: boolean;
	error: Error | null;
	days: AvailableDay[];
};
type UseAvailableDays = (props: Props) => Response;

export const useAvailableDays: UseAvailableDays = ({
	serviceId,
	currentDate,
}) => {
	const { isLoading, error, data } = useQuery({
		queryKey: ["available-days", serviceId, currentDate],
		staleTime: 1000 * 60 * 5, // 5 minutes
 		queryFn: () => {
			console.log("HACIENDO LA LLAMADA PARA EL ",currentDate)
			const { start, end } = getMonthBoundaries(currentDate);

			console.log({start:start.toLocaleDateString("es-ES"), end: end.toLocaleDateString("es-ES")})
				
			// start should be the first day of the month at 00:00:00 BUT if today is after that, use today
			// let adjustedStart = start;
			// const today = new Date();
			// if (today > start) {
			// 	adjustedStart = new Date(
			// 		today.getFullYear(),
			// 		today.getMonth(),
			// 		today.getDate(),
			// 	);
			// }

			// console.log("Fetching boundaries for", currentDate, start, end);
			return (
				appointmentFormRepository.listAvailableDays({
					serviceId,
					from: start.toISOString(),
					to: end.toISOString(),
					staffId: "7ff1d62e-7188-4e93-b7c6-ac7ca9cc7d25",
				}) || []
			);
		},
	});

	const days = data || [];
	return { isLoading, error, days };
};

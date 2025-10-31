import { useQuery } from "@tanstack/react-query";
import type { Slot } from "../domain/slot";
import { appointmentFormRepository } from "../infra/repository";

type Props = {
	serviceId: string;
	staffId?: string;
	currentDate: Date;
};
type Response = {
	isLoading: boolean;
	error: Error | null;
	slots: Slot[];
};
type UseSlots = (props: Props) => Response;

export const useSlots: UseSlots = ({
	serviceId,
	currentDate,
	staffId,
}) => {
	/**
	 * Get day in 'YYYY-MM-DD' format
	 */
	const day = currentDate.toISOString().split("T")[0];

	const { isLoading, error, data } = useQuery({
		queryKey: ["slot", serviceId, staffId, day],
		staleTime: 1000 * 60 * 5, // 5 minutes
		queryFn: () => {
			return (
				appointmentFormRepository.listSlots({
					serviceId,
					staffId,
					day,
				}) || []
			);
		},
	});

	const slots = data || [];
	return { isLoading, error, slots };
};

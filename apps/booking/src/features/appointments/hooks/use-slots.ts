import { useQuery } from "@tanstack/react-query";
import type { Slot } from "~/features/appointment-form/domain/slot";
import { appointmentFormRepository } from "../api/repository";

type Props = {
	serviceId: string;
	staffId?: string;
	date: Date;
};
type Response = {
	isLoading: boolean;
	error: Error | null;
	slots: Slot[];
};
type UseSlots = (props: Props) => Response;

export const useSlots: UseSlots = ({ serviceId, date, staffId }) => {
	const from = date.toISOString();

	const { isLoading, error, data } = useQuery({
		queryKey: ["slot", serviceId, staffId, from],
		staleTime: 1000 * 60 * 5, // 5 minutes
		queryFn: () => {
			return (
				appointmentFormRepository.listSlots({
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

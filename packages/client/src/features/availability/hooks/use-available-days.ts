import type { ISODate } from "@novahair/utils";
import { useQuery } from "@tanstack/react-query";
import type { AvailabilityDay } from "../domain/day";
import { availabilityRepository } from "../infra/repository";
import { Staff } from "../../staff";
import { Service } from "../../services";
import { Tenant } from "../../tenants";

type Props = {
	tenantId: Tenant["id"];
	serviceId: Service["id"];
	staffId?: Staff["id"];
	from: ISODate;
	to: ISODate;
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
	staffId,
}) => {
	const { isLoading, error, data, refetch } = useQuery({
		queryKey: ["available-days", serviceId, staffId, from, to, tenantId],
		staleTime: 1000 * 60 * 5, // 5 minutes

		queryFn: () => {
			return (
				availabilityRepository.getDays(tenantId, {
					serviceId,
					from,
					staffId,
					to,
				}) || []
			);
		},
	});

	const days = data || [];
	return { isLoading, error, days, refetch };
};

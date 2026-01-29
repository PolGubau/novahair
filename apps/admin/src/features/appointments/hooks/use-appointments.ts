import { queryKeys } from "@novahair/utils/lib/query-keys";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
  import { ISODate, toISODate } from "@novahair/utils";
import { Appointment, appointmentsRepository, Tenant } from "@novahair/client";

type Response = {
	isLoading: boolean;
	error: Error | null;
	refetch: () => void;
	appointments: Appointment[];
	from: ISODate;
	to: ISODate;
	setFrom: (from: ISODate) => void;
	setTo: (to: ISODate) => void;
};
type UseAppointments = (tenantId:Tenant["id"]) => Response;

export const useAppointments: UseAppointments = (tenantId) => {
	const [from, setFrom] = useState<ISODate>(() => {
		const date = new Date();
		date.setHours(0, 0, 0, 0);
		return toISODate(date);
	});

	// to is last second of today (one day)
	const [to, setTo] = useState<ISODate>(() => {
		const date = new Date();
		date.setHours(23, 59, 59, 999);
		return toISODate(date);
	});

	const { isLoading, error, data, refetch } = useQuery({
		queryFn: () => appointmentsRepository.list(tenantId, { from, to }),
		queryKey: queryKeys.appointments.list({ from, to, tenantId }),
		staleTime: 1000 * 60 * 5, // 5 minutes
	});

	const appointments = data || [];
	return { appointments, error, from, isLoading, refetch, setFrom, setTo, to };
};

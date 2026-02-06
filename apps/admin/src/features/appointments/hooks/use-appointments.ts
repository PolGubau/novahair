import { queryKeys } from "@novahair/utils/lib/query-keys";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
  import { ISODate, toISODate } from "@novahair/utils";
import { Appointment, appointmentsRepository, Tenant } from "@novahair/client";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Route } from "~/routes/appointments/table";

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
		const { to: externalTo, from: externalFrom, staffId } = useSearch({
			from: Route.fullPath,
		})
		const navigate = useNavigate({ from: Route.fullPath })
	
	const to = toISODate(new Date(externalTo));
	 const from = toISODate(new Date(externalFrom));

	function setFrom(from: ISODate) {
		// first minute of the day
		const date = new Date(from);
		date.setHours(0, 0, 0, 0);
		from = toISODate(date);
		navigate({
			search: (prev) => ({
				...prev,
				from,
			}),
		});
	}

	function setTo(to: ISODate) {
		// last minute of the day
		const date = new Date(to);
		date.setHours(22, 59, 59, 999);
		to = toISODate(date);
		navigate({
			search: (prev) => ({
				...prev,
				to,
			}),
		});
	}

	const { isLoading, error, data, refetch } = useQuery({
		queryFn: () => appointmentsRepository.list(tenantId, { from, to, staffId }),
		queryKey: queryKeys.appointments.list({ from, to, tenantId,staffId }),
		staleTime: 1000 * 60 * 5, // 5 minutes
	});

	const appointments = data || [];
	return { appointments, error, from, isLoading, refetch, setFrom, setTo, to };
};

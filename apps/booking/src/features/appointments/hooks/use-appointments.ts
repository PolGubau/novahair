import { type Appointment, appointmentsRepository } from "@novahair/client";
import { config } from "@novahair/utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTenantId } from "~/shared/tenant";

type Response = {
	isLoading: boolean;
	error: Error | null;
	refetch: () => void;
	appointments: Appointment[];
	from: string;
	to: string;
	setFrom: (from: string) => void;
	setTo: (to: string) => void;
};
type UseAppointments = () => Response;

export const useAppointments: UseAppointments = () => {
	const tenantId = useTenantId();
	const [from, setFrom] = useState<string>(new Date().toISOString());

	// default -> two months from now
	const [to, setTo] = useState<string>(() => {
		const date = new Date();
		date.setMonth(date.getMonth() + 2);
		return date.toISOString();
	});
	const { isLoading, error, data, refetch } = useQuery({
		queryKey: ["appointments", from, to],
		staleTime: 1000 * 60 * 5, // 5 minutes
		queryFn: () => {
			return appointmentsRepository.list(tenantId, { from, to }) || [];
		},
	});

	const appointments: Appointment[] = data || [];
	return { isLoading, error, appointments, refetch, from, to, setFrom, setTo };
};

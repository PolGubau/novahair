import { queryKeys } from "@novahair/utils/lib/query-keys";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { Appointment } from "../domain/appointment";
import { appointmentRepository } from "../infra/repository";

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
	const [from, setFrom] = useState<string>(() => {
		const date = new Date();
		date.setHours(0, 0, 0, 0);
		return date.toISOString();
	});

	// to is last second of today (one day)
	const [to, setTo] = useState<string>(() => {
		const date = new Date();
		date.setHours(23, 59, 59, 999);
		return date.toISOString();
	});

	const { isLoading, error, data, refetch } = useQuery({
		queryFn: () => appointmentRepository.list({ from, to }),
		queryKey: queryKeys.appointments.list({ from, to }),
		staleTime: 1000 * 60 * 5, // 5 minutes
	});

	const appointments = data || [];
	return { appointments, error, from, isLoading, refetch, setFrom, setTo, to };
};

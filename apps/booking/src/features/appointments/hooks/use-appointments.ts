import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { Appointment } from "../domain/appointment";
import { appointmentFormRepository } from "../api/repository";

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
			return appointmentFormRepository.listAppointments({ from, to }) || [];
		},
	});

	const appointments = data || [];
	return { isLoading, error, appointments, refetch, from, to, setFrom, setTo };
};

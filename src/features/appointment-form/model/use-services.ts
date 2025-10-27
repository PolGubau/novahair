import { useQuery } from "@tanstack/react-query";
import { appointmentFormRepository } from "../infra/repository";

export const useServices = () => {
	const { isLoading, error, data } = useQuery({
		queryKey: ["services"],
		staleTime: 1000 * 60 * 5, // 5 minutes
		queryFn: appointmentFormRepository.listServices,
	});
	const services = data || [];

	return { isLoading, error, services };
};

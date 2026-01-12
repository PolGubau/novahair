import { useQuery } from "@tanstack/react-query";
import { staffRepository } from "../infra/repository";

export const useStaffs = () => {
	const { isLoading, error, data, refetch } = useQuery({
		queryKey: ["staffs"],
		staleTime: 1000 * 60 * 30, // 30 minutes
		queryFn: staffRepository.listAll,
	});
	const staffs = data || [];

	return { isLoading, error, staffs, refetch };
};

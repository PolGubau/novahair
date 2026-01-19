import { useMutation, useQueryClient } from "@tanstack/react-query";
import { constants } from "~/shared/constants";
import type { StaffCreate } from "../domain/staff";
import { staffRepository } from "../api/repository";
 
export const useStaff = () => {
	const qc = useQueryClient();

	const create = useMutation({
		mutationFn: (payload: StaffCreate) =>
			staffRepository.create({
				name: payload.name,
				color: payload.color,
				email: payload.email,
				phone: payload.phone,
				tenantId: constants.tenantId,
			}),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["staffs"] });
		},
	});

	const update = useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: StaffCreate }) =>
			staffRepository.update(id, {
				name: payload.name,
				color: payload.color,
				email: payload.email,
				phone: payload.phone,
				tenantId: constants.tenantId,
			}),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["staffs"] });
		},
	});

	const remove = useMutation({
		mutationFn: (id: string) => staffRepository.remove(id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["staffs"] });
		},
	});

	return {
		create,
		update,
		remove,
	};
};

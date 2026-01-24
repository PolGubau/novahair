import { buildApiUrl, genericFetch } from "@novahair/utils";
import type { AssignServicesToStaffDto } from "../../../types";
import type { StaffAssignments } from "../domain/staff-assignments";

export type StaffAssignmentsRepository = {
	getByStaff: (tenantId: string, staffId: string) => Promise<StaffAssignments>;
	assign: (
		tenantId: string,
		staffId: string,
		data: AssignServicesToStaffDto,
	) => Promise<void>;
	unassign: (
		tenantId: string,
		staffId: string,
		serviceId: string,
	) => Promise<void>;
};

export const staffAssignmentsRepository: StaffAssignmentsRepository = {
	getByStaff: async (tenantId, staffId) => {
		const serviceIds = await genericFetch<string[]>(
			buildApiUrl(`tenants/${tenantId}/staff/${staffId}/services`),
		);
		return { serviceIds };
	},

	assign: async (tenantId, staffId, data) => {
		await genericFetch(
			buildApiUrl(`tenants/${tenantId}/staff/${staffId}/services`),
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			},
		);
	},

	unassign: async (tenantId, staffId, serviceId) => {
		await genericFetch(
			buildApiUrl(`tenants/${tenantId}/staff/${staffId}/services/${serviceId}`),
			{
				method: "DELETE",
			},
		);
	},
};

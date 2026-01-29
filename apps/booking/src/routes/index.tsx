import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

const searchSchema = z.object({
	serviceId: z.string().optional(),
	tenantId: z.string().optional(),
	staffId: z.string().optional(),
});

export const Route = createFileRoute("/")({
	validateSearch: searchSchema,
	beforeLoad: async ({ search }) => {
		const { serviceId, staffId } = search;
		
		// if service and staff IDs are provided, redirect to calendar step
		if (serviceId && staffId) {
			throw redirect({
				to: "/calendar",
				search: {
					serviceId,
					staffId,
				},
			});
		}

		// If service ID is provided, redirect directly to next step
		if (search.serviceId) {
			throw redirect({
				to: "/choose-staff",
				search: {
					serviceId: search.serviceId,
 				},
			});
		}

		// Otherwise, show service selector
		throw redirect({
			to: "/choose-service",
		});
	},
});

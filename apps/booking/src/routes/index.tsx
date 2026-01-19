import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

const searchSchema = z.object({
	service: z.string().optional(),
	tenant: z.string().optional(),
});

export const Route = createFileRoute("/")({
	validateSearch: searchSchema,
	beforeLoad: async ({ search }) => {
		// If service ID is provided, redirect directly to calendar
		if (search.service) {
			throw redirect({
				to: "/$serviceId",
				params: { serviceId: search.service },
			});
		}
		
		// Otherwise, show service selector
		throw redirect({
			to: "/choose-service",
		});
	},
});

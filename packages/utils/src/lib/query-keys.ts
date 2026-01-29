/**
 * Query keys para TanStack Query
 * Centraliza las keys para evitar typos y facilitar refactoring
 */
export const queryKeys = {
	appointments: {
		all: ["appointments"] as const,
		list: (params: { from: string; to: string; tenantId: string }) =>
			[...queryKeys.appointments.all, params] as const,
	},
	services: {
		all: ["services"] as const,
		detail: (id: string) => [...queryKeys.services.all, id] as const,
	},
	staff: {
		all: ["staff"] as const,
		detail: (id: string) => [...queryKeys.staff.all, id] as const,
	},
} as const;

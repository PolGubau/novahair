import { env } from "./lib/env";

// Validación de variables de entorno
if (!env.tenantId) {
	throw new Error(
		"Missing VITE_TENANT_ID environment variable. Please check your .env file.",
	);
}

if (!env.isDev && !env.baseUrl) {
	throw new Error(
		"Missing VITE_BASE_URL environment variable for production build.",
	);
}

export const config = {
	baseUrl:
		env.isDev && !env.isSSR
			? "/api"
			: env.baseUrl || "https://api.gerardmartinez.es",
	tenantId: env.tenantId as string,
	apiVersion: "v1",
} as const;

/**
 * Base path for API requests
 * @example "/api/v1" in development
 * @example "https://api.gerardmartinez.es/v1" in production
 */
export const basePath = `${config.baseUrl}/${config.apiVersion}`;

// API Endpoints builders
export const endpoints = {
	// Services
	getServices: `${basePath}/services`,
	services: `${basePath}/services`,

	// Staff
	listStaffs: `${basePath}/staff`,
	staff: `${basePath}/staff`,

	// Available days and slots
	getAvailableDays: (props: {
		serviceId: string;
		staffId?: string;
		from?: string;
		to?: string;
	}) => {
		const params = new URLSearchParams({
			serviceId: props.serviceId,
			...(props.staffId && { staffId: props.staffId }),
			...(props.from && { from: props.from }),
			...(props.to && { to: props.to }),
		});
		return `${basePath}/available-days?${params.toString()}`;
	},

	getSlots: (props: { serviceId: string; staffId?: string; from: string }) => {
		const params = new URLSearchParams({
			serviceId: props.serviceId,
			from: props.from,
			...(props.staffId && { staffId: props.staffId }),
		});
		return `${basePath}/slots?${params.toString()}`;
	},

	// Appointments
	bookAppointment: `${basePath}/appointments`,

	listAppointments: (props: { from: string; to: string }) => {
		const params = new URLSearchParams({
			from: props.from,
			to: props.to,
		});
		return `${basePath}/appointments?${params.toString()}`;
	},
} as const;

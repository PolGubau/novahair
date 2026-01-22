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
	baseUrl: env.isDev ? "/api" : env.baseUrl,
	tenantId: env.tenantId as string,
	apiVersion: "v1",
} as const;

// API Endpoints builders
export const endpoints = {
	// Services
	getServices: `${config.baseUrl}/services`,
	services: `${config.baseUrl}/services`,

	// Staff
	listStaffs: `${config.baseUrl}/staff`,
	staff: `${config.baseUrl}/staff`,

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
		return `${config.baseUrl}/available-days?${params.toString()}`;
	},

	getSlots: (props: { serviceId: string; staffId?: string; from: string }) => {
		const params = new URLSearchParams({
			serviceId: props.serviceId,
			from: props.from,
			...(props.staffId && { staffId: props.staffId }),
		});
		return `${config.baseUrl}/slots?${params.toString()}`;
	},

	// Appointments
	bookAppointment: `${config.baseUrl}/appointments`,

	listAppointments: (props: { from: string; to: string }) => {
		const params = new URLSearchParams({
			from: props.from,
			to: props.to,
		});
		return `${config.baseUrl}/appointments?${params.toString()}`;
	},
} as const;

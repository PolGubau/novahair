import type {
	GetAvailableDaysProps,
	GetSlotsProps,
} from "~/features/appointment-form/infra/repository";

export const baseUrl = import.meta.env.DEV
	? "/api"
	: import.meta.env.VITE_BASE_URL;

export const constants = {
	baseUrl,
	tenantId: import.meta.env.VITE_TENANT_ID,
};

const versions = {
	v1: "v1",
	v2: "v2",
	v3: "v3",
};

/**
 * Construye una URL con versión y query params.
 * Soporta rutas relativas (ej: /api en dev) y SSR.
 */
export const buildUrl = (
	path = "",
	version = versions.v1,
	params?: Record<string, string | undefined>,
) => {
	// Usar baseUrl que tiene lógica DEV/prod correcta
	const base = baseUrl;

	// Construir path completo
	const fullPath = `${base}/${version}/${path}`;

	// Si no hay params, retornar path directamente
	if (!params || Object.keys(params).length === 0) {
		return fullPath;
	}

	// Construir query string manualmente para evitar new URL() en SSR
	const queryParams = Object.entries(params)
		.filter(([_, value]) => value !== undefined && value !== null)
		.map(
			([key, value]) =>
				`${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`,
		)
		.join("&");

	return queryParams ? `${fullPath}?${queryParams}` : fullPath;
};

export const endpoints = {
	staff: buildUrl(`staff`),
	list_staffs: buildUrl(`staff/tenant/${constants.tenantId}`),
	services: buildUrl("services"),
	getServices: buildUrl(`services/tenant/${constants.tenantId}`),
	getAvailableDays: (params: GetAvailableDaysProps) =>
		buildUrl(`tenants/${constants.tenantId}/availability/days`, versions.v1, {
			serviceId: params.serviceId,
			staffId: params.staffId,
			from: params.from,
			to: params.to,
		}),
	getSlots: ({ serviceId, staffId, from }: GetSlotsProps) =>
		buildUrl(`tenants/${constants.tenantId}/availability`, versions.v1, {
			serviceId,
			staffId,
			from,
		}),

	bookAppointment: buildUrl(`tenants/${constants.tenantId}/appointments`),
};

import type {
	GetAvailableDaysProps,
	GetSlotsProps,
} from "~/features/appointment-form/infra/repository";

export const baseUrl = import.meta.env.DEV
	? "/server"
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
 * Soporta rutas relativas (ej: /server en dev).
 */
export const buildUrl = (
	path = "",
	version = versions.v1,
	params?: Record<string, string | undefined>,
) => {
	// si baseUrl es relativo (/server), añadimos un origen temporal
	const base = import.meta.env.VITE_BASE_URL;

	const url = new URL(`${base}/${version}/${path}`);

	if (params) {
		Object.entries(params).forEach(([key, value]) => {
			if (value) url.searchParams.append(key, value);
		});
	}

	return url.toString();
};

export const getEndpoints = () => ({
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
});

export const endpoints = getEndpoints();

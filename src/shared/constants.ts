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

export type GetAvailableDaysProps = {
	serviceId: string;
	staffId?: string;
	from?: string;
	to?: string;
};
export const endpoints = {
	getServices: `${constants.baseUrl}/${versions.v1}/services/tenant/${constants.tenantId}`,
	getAvailableDays: (params: GetAvailableDaysProps) =>
		`${constants.baseUrl}/${versions.v1}/tenants/${constants.tenantId}/availability/days?serviceId=${params.serviceId}&staffId=${params.staffId}&from=${params.from}&to=${params.to}`,
};

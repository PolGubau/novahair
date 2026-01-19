import { config } from "../constants";

/**
 * Construye una URL completa para el API
 * @param path - Ruta relativa (ej: "staff/tenant/123")
 * @param params - Query parameters opcionales
 */
export function buildApiUrl(
	path: string,
	params?: Record<string, string | undefined>,
): string {
	const basePath = `${config.baseUrl}/${config.apiVersion}/${path}`;

	if (!params || Object.keys(params).length === 0) {
		return basePath;
	}

	const searchParams = new URLSearchParams();
	for (const [key, value] of Object.entries(params)) {
		if (value !== undefined) {
			searchParams.append(key, value);
		}
	}

	return `${basePath}?${searchParams.toString()}`;
}

/**
 * Construye URL para recursos del tenant actual
 */
export function buildTenantUrl(
	resource: string,
	params?: Record<string, string | undefined>,
): string {
	return buildApiUrl(`tenants/${config.tenantId}/${resource}`, params);
}

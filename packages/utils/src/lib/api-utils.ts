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
	const url = new URL(`${config.baseUrl}/${config.apiVersion}/${path}`);

	if (params) {
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined) {
				url.searchParams.append(key, value);
			}
		});
	}

	return url.toString();
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

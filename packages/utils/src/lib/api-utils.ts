import { basePath, config } from "../constants";

/**
 * Construye una URL completa para el API
 * @param path - Ruta relativa (ej: "staff/tenant/123")
 * @param params - Query parameters opcionales
 */
export function buildApiUrl(
	path: string,
	params?: Record<string, string | number | boolean | string[] | undefined>,
): string {
	const fullPath = `${basePath}/${path}`;

	if (!params || Object.keys(params).length === 0) {
		return fullPath;
	}

	const searchParams = new URLSearchParams();
	for (const [key, value] of Object.entries(params)) {
		if (value !== undefined) {
			const stringValue = Array.isArray(value) ? value.join(',') : String(value);
			searchParams.append(key, stringValue);
		}
	}

	return `${fullPath}?${searchParams.toString()}`;
}

/**
 * Construye URL para recursos del tenant actual
 */
export function buildTenantUrl(
	resource: string,
	params?: Record<string, string | number | boolean | string[] | undefined>,
): string {
	return buildApiUrl(`${tenantPath}/${resource}`, params);
}

export const tenantPath = `tenants/${config.tenantId}`;

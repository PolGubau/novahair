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
	baseUrl: env.baseUrl,
	get tenantId(): string {
		return env.tenantId as string;
	},
	apiVersion: "v1",
} as const;

/**
 * Base path for API requests
 * @example "/api/v1" in development
 * @example "https://api.gerardmartinez.es/api/v1" in production
 */
export const basePath = `${config.baseUrl}/api/${config.apiVersion}`;

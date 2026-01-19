/// <reference types="vite/client" />

/**
 * Centralized environment variable access with proper typing
 * This module provides type-safe access to Vite environment variables
 */

/**
 * Type-safe environment variable access
 */
export const env = {
	/** Development mode flag */
	get isDev(): boolean {
		return import.meta.env.DEV;
	},

	/** Production mode flag */
	get isProd(): boolean {
		return import.meta.env.PROD;
	},

	/** Current mode (development, production, etc.) */
	get mode(): string {
		return import.meta.env.MODE;
	},

	/** Server-side rendering flag */
	get isSSR(): boolean {
		return import.meta.env.SSR;
	},

	/** Base URL for API calls */
	get baseUrl(): string | undefined {
		return import.meta.env.VITE_BASE_URL;
	},

	/** Tenant ID for multi-tenant applications */
	get tenantId(): string | undefined {
		return import.meta.env.VITE_TENANT_ID;
	},

	/** API URL */
	get apiUrl(): string | undefined {
		return import.meta.env.VITE_API_URL;
	},
} as const;

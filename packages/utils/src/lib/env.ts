/**
 * Centralized environment variable access with proper typing
 * This module provides type-safe access to Vite environment variables
 */

interface ImportMetaEnv {
	readonly DEV: boolean;
	readonly PROD: boolean;
	readonly MODE: string;
	readonly VITE_BASE_URL?: string;
	readonly VITE_TENANT_ID?: string;
	readonly VITE_API_URL?: string;
	readonly SSR: boolean;
}

export interface ImportMeta {
	readonly env: ImportMetaEnv;
}

/**
 * Type-safe environment variable access
 */
export const env = {
	/** Development mode flag */
	isDev: import.meta.env.DEV,
	
	/** Production mode flag */
	isProd: import.meta.env.PROD,
	
	/** Current mode (development, production, etc.) */
	mode: import.meta.env.MODE,
	
	/** Server-side rendering flag */
	isSSR: import.meta.env.SSR,
	
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

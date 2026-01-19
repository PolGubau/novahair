/**
 * Tenant configuration and utilities
 */

export interface TenantConfig {
	id: string;
	name: string;
	// Add more tenant-specific configuration as needed
}

/**
 * Hook to get tenant ID from localStorage
 * The tenant must have been set via URL param on initial load
 */
export function useTenantId(): string | null {
	// Check localStorage (set by __root beforeLoad)
	if (typeof window !== "undefined") {
		const storedTenantId = localStorage.getItem("tenantId");
		if (storedTenantId) {
			return storedTenantId;
		}
	}

	return null;
}

/**
 * Get tenant ID synchronously (for non-React contexts like API calls)
 * Reads from localStorage which was set via URL param on initial load
 * Note: Cannot access URL params outside of React components
 */
export function getTenantId(): string | null {
	// Check localStorage
	if (typeof window !== "undefined") {
		const storedTenantId = localStorage.getItem("tenantId");
		if (storedTenantId) {
			return storedTenantId;
		}
	}

	return null;
}

/**
 * Set tenant ID in localStorage
 * SSR-safe: Only works in browser environment
 */
export function setTenantId(tenantId: string): void {
	if (typeof window !== "undefined") {
		localStorage.setItem("tenantId", tenantId);
	}
}

/**
 * Clear tenant ID from localStorage
 * SSR-safe: Only works in browser environment
 */
export function clearTenantId(): void {
	if (typeof window !== "undefined") {
		localStorage.removeItem("tenantId");
	}
}

/**
 * Validate if a tenant ID is set
 */
export function hasTenantId(): boolean {
	return getTenantId() !== null;
}

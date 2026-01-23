export function getTenantId() {
	if (typeof window !== "undefined") {
		const stored = localStorage.getItem("tenantId");
		if (stored) return stored;
	}
}

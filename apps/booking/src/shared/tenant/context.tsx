import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { getTenantId, setTenantId } from "./lib/tenant";

interface TenantContextType {
	tenantId: string | null;
	setTenantId: (id: string) => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({
	children,
	initialTenantId,
}: { children: ReactNode; initialTenantId?: string | null }) {
	const [tenantId, setTenantIdState] = useState<string | null>(
		initialTenantId || null,
	);

	useEffect(() => {
		// Initialize from localStorage on mount if not provided
		if (!initialTenantId) {
			const stored = getTenantId();
			if (stored) {
				setTenantIdState(stored);
			}
		}
	}, [initialTenantId]);

	const updateTenantId = (id: string) => {
		setTenantIdState(id);
		setTenantId(id);
	};

	return (
		<TenantContext.Provider value={{ tenantId, setTenantId: updateTenantId }}>
			{children}
		</TenantContext.Provider>
	);
}

export function useTenantId(): string {
	const context = useContext(TenantContext);
	if (!context) {
		throw new Error("useTenant must be used within a TenantProvider");
	}
	if (!context.tenantId) {
		throw new Error(
			"Tenant ID is not set. This should not happen inside the app after TenantGuard.",
		);
	}
	return context.tenantId;
}

export function useTenant() {
	const context = useContext(TenantContext);
	if (!context) {
		throw new Error("useTenant must be used within a TenantProvider");
	}
	return context;
}

import type { ReactNode } from "react";
import { TenantError } from "./tenant-error";

interface TenantGuardProps {
	children: ReactNode;
}

export function TenantGuard({ children }: TenantGuardProps) {
	// Check localStorage (set by beforeLoad when URL had tenant param)
	const storedTenantId =
		typeof window !== "undefined" ? localStorage.getItem("tenantId") : null;

	if (!storedTenantId) {
		return <TenantError />;
	}

	return <>{children}</>;
}

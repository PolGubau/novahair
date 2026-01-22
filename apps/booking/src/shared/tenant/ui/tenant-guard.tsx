import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { TenantError } from "./tenant-error";

interface TenantGuardProps {
	children: ReactNode;
}

export function TenantGuard({ children }: TenantGuardProps) {
	const routerState = useRouterState();
	const search = routerState.location.search as { tenant?: string };
	// Check URL param first, then localStorage
	const tenantId =
		search.tenant ||
		(typeof window !== "undefined" ? localStorage.getItem("tenantId") : null);
	console.log("TenantGuard:", {
		searchTenant: search.tenant,
		localStorageTenant:
			typeof window !== "undefined" ? localStorage.getItem("tenantId") : null,
		tenantId,
	});

	// Set localStorage if tenant is in URL and not already stored
	useEffect(() => {
		if (
			search.tenant &&
			typeof window !== "undefined" &&
			!localStorage.getItem("tenantId")
		) {
			console.log(
				"Setting tenantId in localStorage from TenantGuard:",
				search.tenant,
			);
			localStorage.setItem("tenantId", search.tenant);
		}
	}, [search.tenant]);

	if (!tenantId) {
		return <TenantError />;
	}

	return <>{children}</>;
}

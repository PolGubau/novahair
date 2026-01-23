import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect, useMemo } from "react";
import { TenantProvider, useTenant } from "../context";
import { TenantError } from "./tenant-error";

interface TenantGuardProps {
	children: ReactNode;
}

function TenantGuardInner({ children }: TenantGuardProps) {
	const { tenantId } = useTenant();

	if (!tenantId) {
		return <TenantError />;
	}

	return <>{children}</>;
}

export function TenantGuard({ children }: TenantGuardProps) {
	const routerState = useRouterState();
	const search = routerState.location.search as { tenant?: string };

	// Check URL param first, then localStorage
	const initialTenantId = useMemo(() => {
		return (
			search.tenant ||
			(typeof window !== "undefined" ? localStorage.getItem("tenantId") : null)
		);
	}, [search.tenant]);

	return (
		<TenantProvider initialTenantId={initialTenantId}>
			<TenantGuardLogic>{children}</TenantGuardLogic>
		</TenantProvider>
	);
}

function TenantGuardLogic({ children }: TenantGuardProps) {
	const routerState = useRouterState();
	const { setTenantId } = useTenant();
	const search = routerState.location.search as { tenant?: string };

	// Set localStorage if tenant is in URL and different from stored
	useEffect(() => {
		if (
			search.tenant &&
			typeof window !== "undefined" &&
			localStorage.getItem("tenantId") !== search.tenant
		) {
			console.log(
				"Updating tenantId in localStorage from TenantGuard:",
				search.tenant,
			);
			setTenantId(search.tenant);
		}
	}, [search.tenant, setTenantId]);

	return <TenantGuardInner>{children}</TenantGuardInner>;
}

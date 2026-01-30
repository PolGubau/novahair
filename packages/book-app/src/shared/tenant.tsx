import { createContext, useContext, ReactNode } from 'react';

const TenantContext = createContext<string | null>(null);

export const TenantProvider = ({ tenantId, children }: { tenantId: string; children: ReactNode }) => {
	return <TenantContext.Provider value={tenantId}>{children}</TenantContext.Provider>;
};

export const useTenantId = () => {
	const tenantId = useContext(TenantContext);
	if (!tenantId) throw new Error('useTenantId must be used within TenantProvider');
	return tenantId;
};

export const useTenant = () => {
	const tenantId = useTenantId();
	return { tenantId };
};
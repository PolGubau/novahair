export {
	getTenantId,
	setTenantId,
	clearTenantId,
	hasTenantId,
} from "./lib/tenant";
export { TenantGuard } from "./ui/tenant-guard";
export { TenantError } from "./ui/tenant-error";
export { TenantProvider, useTenant, useTenantId } from "./context";
export type { TenantConfig } from "./lib/tenant";

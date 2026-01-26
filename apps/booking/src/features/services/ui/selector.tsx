import { useServices } from "@novahair/client";
import { ApiErrorFallback } from "@novahair/ui/api-error-fallback";
import { t } from "i18next";
import { useTenant } from "~/shared/tenant";
import { ServiceList, ServiceListSkeleton } from "./list/list";

export const ServiceSelector = () => {
	const { tenantId } = useTenant();

	// Don't call useServices if tenantId is not available yet
	const { isLoading, error, services, refetch } = useServices(tenantId || "");

	// Show loading if tenantId is not available or if services are loading
	if (!tenantId || isLoading) {
		return (
			<div className="flex flex-col gap-4">
				<h1 className="text-4xl mb-4">{t("elige_servicio")}</h1>
				<ServiceListSkeleton />
			</div>
		);
	}

	if (error) {
		return <ApiErrorFallback error={error} reset={() => refetch()} />;
	}

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-4xl mb-4">{t("elige_servicio")}</h1>
			<ServiceList services={services} />
		</div>
	);
};

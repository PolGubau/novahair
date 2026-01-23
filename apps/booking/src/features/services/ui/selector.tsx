import { useServices } from "@novahair/client";
import { ApiErrorFallback } from "@novahair/ui/api-error-fallback";
import { config } from "@novahair/utils";
import { useTenantId } from "~/shared/tenant";
import { t } from "i18next";
import { ServiceList, ServiceListSkeleton } from "./list/list";

export const ServiceSelector = () => {
	const tenantId = useTenantId();
	const { isLoading, error, services, refetch } = useServices(tenantId);

	if (error) {
		return <ApiErrorFallback error={error} reset={() => refetch()} />;
	}

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-4xl mb-4">{t("elige_servicio")}</h1>
			{isLoading ? (
				<ServiceListSkeleton />
			) : (
				<ServiceList services={services} />
			)}
		</div>
	);
};

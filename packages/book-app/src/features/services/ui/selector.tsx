import { useServices } from "@novahair/client";
import { ApiErrorFallback } from "@novahair/ui/api-error-fallback";
import { t } from "i18next";
import { useTenantId } from "../../../shared/tenant";
import { ServiceList, ServiceListSkeleton } from "./list/list";

type Props = {
	onServiceSelect?: (serviceId: string) => void;
};

export const ServiceSelector = ({ onServiceSelect }: Props) => {
	const tenantId = useTenantId();

	// Don't call useServices if tenantId is not available yet
	const { isLoading, error, services, refetch } = useServices(tenantId || "");

	// Show loading if tenantId is not available or if services are loading
	if (!tenantId || isLoading) {
		return (
			<div className="flex flex-col gap-4 h-full">
				<h1 className="text-2xl md:text-4xl mb-2 md:mb-4">{t("choose_service")}</h1>
				<ServiceListSkeleton />
			</div>
		);
	}

	if (error) {
		return <ApiErrorFallback error={error} reset={() => refetch()} />;
	}

	return (
		<div className="flex flex-col gap-4 h-full">
			<h1 className="text-2xl md:text-4xl mb-2 md:mb-4">{t("choose_service")}</h1>
			<ServiceList services={services} onServiceSelect={onServiceSelect} />
		</div>
	);
};

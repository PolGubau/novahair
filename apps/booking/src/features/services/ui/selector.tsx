import { t } from "i18next";
import { ApiErrorFallback } from "@novahair/ui/api-error-fallback";
 import { ServiceList, ServiceListSkeleton } from "./list/list";
import { useServices } from "../hooks/use-services";

export const ServiceSelector = () => {
	const { isLoading, error, services, refetch } = useServices();

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

import { t } from "i18next";
import { useServices } from "../model/use-services";
import { ServiceList, ServiceListSkeleton } from "./list/list";

export const ServiceSelector = () => {
	const { isLoading, error, services } = useServices();

	if (error) return `An error has occurred: ${error.message}`;

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

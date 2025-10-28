import { t } from "i18next";
import { LoadingOverlay } from "~/shared/ui/loading-overlay";
import { useServices } from "../model/use-services";
import { ServiceList } from "./services/list";

export const ServiceSelector = () => {
	const { isLoading, error, services } = useServices();

	if (error) return `An error has occurred: ${error.message}`;

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-4xl mb-4">{t("eligeServicio")}</h1>
			<LoadingOverlay isLoading={isLoading}>
				<ServiceList services={services} />
			</LoadingOverlay>
		</div>
	);
};

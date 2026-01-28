import { useServices } from "@novahair/client";
import { config } from "@novahair/utils";
import { t } from "i18next";
 import { ServiceList } from "~/features/services/ui/list/list";

export const Services = () => {
	const { services, error, isLoading } = useServices(config.tenantId);

	// Si hay un error, no mostrar la sección
	if (error || (!isLoading && services.length === 0)) {
		return null;
	}

	return (
		<section className="flex flex-col items-center gap-4 max-w-7xl w-full mx-auto px-4 min-h-[65vh] py-12">
			<h2 className="text-4xl lg:text-6xl">{t("our_services")}</h2>
			<p className="text-center text-pretty max-w-md mb-16">
				{t("description_services")}
			</p>

			<ServiceList services={services} />
		</section>
	);
};

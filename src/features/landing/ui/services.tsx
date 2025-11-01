import { t } from "i18next";
import { useServices } from "~/features/appointment-form/model/use-services";
import { ServiceList } from "~/features/appointment-form/ui/services/list";

export const Services = () => {
	const { services } = useServices();
	return (
		<section className="flex flex-col items-center gap-4 max-w-7xl w-full mx-auto px-4 min-h-[85vh] py-12">
			<h2 className="text-4xl lg:text-6xl">{t("our_services")}</h2>
			<p className="text-center text-pretty max-w-md mb-16">
				{t("description_services")}
			</p>

			<ServiceList services={services} />
		</section>
	);
};

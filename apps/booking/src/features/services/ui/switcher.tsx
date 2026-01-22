import { useNavigate } from "@tanstack/react-router";
import { Route } from "~/routes/$serviceId";
import type { TranslationKey } from "@novahair/utils/i18n/setup";
import { Select } from "@novahair/ui/select";
import { useServices } from "@novahair/client";
  
export const ServiceSwitcher = () => {
	const navigate = useNavigate({ from: "/$serviceId" });

	const { services } = useServices();
	const selectedServiceId = Route.useParams().serviceId;

	const handleChange = (value: string) => {
		const newServiceId = value;
		navigate({ to: `/${newServiceId}` });
	};

	return (
		<Select
			onChange={handleChange}
			value={selectedServiceId}
			options={services.map((service) => ({
				label: service.name as TranslationKey,
				value: service.id,
			}))}
		/>
	);
};

import { useNavigate } from "@tanstack/react-router";
import { Route } from "~/routes/book/$serviceId";
import type { TranslationKey } from "~/shared/i18n/setup";
import { Select } from "~/shared/ui/select";
import { useServices } from "../model/use-services";

export const ServiceSwitcher = () => {
	const navigate = useNavigate({ from: "/book/$serviceId" });

	const { services } = useServices();
	const selectedServiceId = Route.useParams().serviceId;

	const handleChange = (value: string) => {
		const newServiceId = value;
		navigate({ to: `/book/${newServiceId}` });
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

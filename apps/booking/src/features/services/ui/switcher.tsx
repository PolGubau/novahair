import { useServices } from "@novahair/client";
import { Select } from "@novahair/ui/select";
import { config } from "@novahair/utils";
import type { TranslationKey } from "@novahair/utils/i18n/setup";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "~/routes/$serviceId";
import { useTenantId } from "~/shared/tenant";

export const ServiceSwitcher = () => {
	const navigate = useNavigate({ from: "/$serviceId" });
	const tenantId = useTenantId();

	const { services } = useServices(tenantId);
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

import { useServices } from "@novahair/client";
import { Select } from "@novahair/ui/select";
import { config } from "@novahair/utils";
import type { TranslationKey } from "@novahair/utils/i18n/setup";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "~/routes/$serviceId";
import { useTenant } from "~/shared/tenant";

export const ServiceSwitcher = () => {
	const navigate = useNavigate({ from: "/$serviceId" });
	const { tenantId } = useTenant();

	const { services } = useServices(tenantId || "");
	const selectedServiceId = Route.useParams().serviceId;

	const handleChange = (value: string) => {
		const newServiceId = value;
		navigate({ to: `/${newServiceId}` });
	};

	// Filter out services without valid IDs to prevent Radix UI Select errors
	const validServices = services.filter(
		(service) => service.id && service.id.trim() !== "",
	);

	// Don't render anything if tenantId is not available or no valid services
	if (!tenantId || validServices.length === 0) {
		return null;
	}

	return (
		<Select
			onChange={handleChange}
			value={selectedServiceId}
			options={validServices.map((service) => ({
				label: service.name as TranslationKey,
				value: service.id,
			}))}
		/>
	);
};

import { useServices } from "@novahair/client";
import { Avatar } from "@novahair/ui";
import { Select } from "@novahair/ui/select";
import type { TranslationKey } from "@novahair/utils/i18n/types";

import { useTenantId } from "~/shared/tenant";

type Props = {
	serviceId: string;
	onSelect: (serviceId: string) => void;
}
export const ServiceSwitcher = ({ serviceId, onSelect }: Props) => {
 	const tenantId = useTenantId();

	const { services } = useServices(tenantId);

	const validServices = services.filter(
		(service) => service.id && service.id.trim() !== "",
	);
	if (validServices.length === 0) {
		return null;
	}

	return (
		<Select
			onChange={onSelect}
			value={serviceId}
			classNames={{
				trigger:"pl-2"
			}}
			options={validServices.map((service) => ({
				label: service.name as TranslationKey,
				value: service.id,
			}))}
				customOptionRender={(option) => {
							const service = validServices.find((s) => s.id === option.value);
							if (!service) return null;
							return (
			
								<span className="flex gap-2 items-center">
									<Avatar src={service.imageUrl} alt={service.name} className="size-6" />
										{service.name}</span>
						)}}
		/>
	);
};

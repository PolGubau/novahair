import type { Service } from "../../domain/service";
import { ServiceItem } from "./item";

type Props = {
	services: Service[];
};
export const ServiceList = ({ services }: Props) => {
	return (
		<ul className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4">
			{services.map((service) => (
				<ServiceItem key={service.id} service={service} />
			))}
		</ul>
	);
};

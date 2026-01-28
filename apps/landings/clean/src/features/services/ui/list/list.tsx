 import { Service } from "@novahair/client";
import { ServiceItem } from "./item";
import { ServiceItemSkeleton } from "./item-skeleton";

type Props = {
	services: Service[];
};

export const ServiceList = ({ services }: Props) => {
	return (
		<ul className="grid md:grid-cols-2 gap-4">
			{services.map((service) => (
				<ServiceItem key={service.id} service={service} />
			))}
		</ul>
	);
};

export const ServiceListSkeleton = ({ count = 4 }: { count?: number }) => {
	return (
		<ul className="grid md:grid-cols-2 gap-4">
			{Array.from({ length: count }).map((_, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: ta bn
				<ServiceItemSkeleton key={index} />
			))}
		</ul>
	);
};

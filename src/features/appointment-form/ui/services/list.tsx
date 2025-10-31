import type { Service } from "../../domain/service";
import { ServiceItem } from "./item";
import { ServiceItemSkeleton } from "./item-skeleton";

type Props = {
	services: Service[];
};

export const ServiceList = ({ services }: Props) => {
	return (
		<ul className="grid grid-cols-[repeat(auto-fit,minmax(500px,1fr))] gap-4">
			{services.map((service) => (
				<ServiceItem key={service.id} service={service} />
			))}
		</ul>
	);
};


export const ServiceListSkeleton = ({ count=4 }: { count?: number }) => {
	return (
		<ul className="grid grid-cols-[repeat(auto-fit,minmax(500px,1fr))] gap-4">
			{Array.from({ length: count }).map((_, index) => (
				<ServiceItemSkeleton key={index} />
			))}
		</ul>
	);
};
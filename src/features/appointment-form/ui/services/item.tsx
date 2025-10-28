import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { Service } from "../../domain/service";

type Props = {
	service: Service;
};
export const ServiceItem = ({ service }: Props) => {
	return (
		<li
			key={service.id}
			className="rounded-2xl overflow-hidden shadow bg-white gap-5 grid grid-cols-[1fr_2fr] items-center"
		>
			<img
				src={"/images/1.webp"}
				alt="preview"
				className="h-full w-full object-cover"
			/>
			<div className="p-4">
				<h2 className="text-2xl mb-2">{service.name}</h2>

				<p className="text-foreground/80 text-balance line-clamp-5">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
					distinctio vero ipsa minima rem sunt ullam, minus autem qui
					perferendis cum dignissimos.
				</p>

				<nav className="flex justify-end pt-3">
					<Link
						to="/book/$serviceId"
						params={{ serviceId: service.id }}
						className="mt-2 flex gap-2 pl-4 pr-2 py-2 bg-primary hover:bg-primary/80 transition-all text-white rounded-xl cursor-pointer"
					>
						Seleccionar
						<ChevronRight />
					</Link>
				</nav>
			</div>
		</li>
	);
};

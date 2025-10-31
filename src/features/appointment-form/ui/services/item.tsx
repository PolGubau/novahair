import { Link } from "@tanstack/react-router";
import { t } from "i18next";
import { ChevronRight } from "lucide-react";
import type { Service } from "../../domain/service";

type Props = {
	service: Service;
};
export const ServiceItem = ({ service }: Props) => {
	return (
		<li className="rounded-2xl overflow-hidden shadow bg-white gap-5 grid grid-cols-[1fr_2fr] items-center">
			<div className="h-full bg-primary/5 w-full grid place-items-center">
				{service.imageUrl && (
					<img
						src={service.imageUrl}
						alt="preview"
						className=" object-cover h-full flex w-full"
					/>
				)}
			</div>
			<div className="p-4 flex flex-col h-full justify-between">
				<header>
					<h2 className="text-2xl mb-2">{service.name}</h2>

					<p className="text-foreground/80 text-balance line-clamp-5">
						{service.description}
					</p>
				</header>

				<nav className="flex justify-end pt-3">
					<Link
						to="/book/$serviceId"
						params={{ serviceId: service.id }}
						className="mt-2 flex gap-2 pl-4 pr-2 py-2 bg-primary hover:bg-primary/80 transition-all text-white rounded-xl cursor-pointer"
					>
						{t("seleccionar")}
						<ChevronRight />
					</Link>
				</nav>
			</div>
		</li>
	);
};

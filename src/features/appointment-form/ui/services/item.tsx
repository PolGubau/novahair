import { Link } from "@tanstack/react-router";
import { t } from "i18next";
import { ChevronRight } from "lucide-react";
import { Button } from "~/shared/ui/button";
import type { Service } from "../../domain/service";

type Props = {
	service: Service;
};
export const ServiceItem = ({ service }: Props) => {
	return (
		<li className="rounded-2xl overflow-hidden shadow bg-foreground/3 gap-1 md:gap-4 grid grid-cols-[1fr_2fr] items-center">
			<div className="bg-foreground/10 w-full grid place-items-center h-44">
				{service.imageUrl && (
					<img
						src={service.imageUrl}
						alt="preview"
						className=" object-cover h-full flex w-full"
					/>
				)}
			</div>
			<div className="p-2 md:py-4 gap-2 flex flex-col h-full justify-between">
				<header className="flex flex-col gap-1">
					<h2 className="text-xl md:text-2xl">{service.name}</h2>

					<p className="text-foreground/70 text-sm text-balance line-clamp-4">
						{service.description}
					</p>
				</header>

				<nav className="flex">
					<Link
						to="/book/$serviceId"
						params={{ serviceId: service.id }}
						className="mt-2"
					>
						<Button>
							{t("check_availability")}
							<ChevronRight />
						</Button>
					</Link>
				</nav>
			</div>
		</li>
	);
};

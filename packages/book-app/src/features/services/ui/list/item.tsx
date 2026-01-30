import type { Service } from "@novahair/client";
import { Avatar } from "@novahair/ui";
import { Button } from "@novahair/ui/button";
import { t } from "i18next";
import { ChevronRight } from "lucide-react";

type Props = {
	service: Service;
	onServiceSelect?: (serviceId: string) => void;
};

export const ServiceItem = ({ service, onServiceSelect }: Props) => {
	return (
		<li className="rounded-2xl overflow-hidden bg-muted border border-foreground/10 gap-1 md:gap-4 grid grid-cols-[1fr_2fr] items-center">
  					<Avatar
						src={service.imageUrl}
						alt={service.name}
						className="rounded-none w-full h-full border-none object-cover"
					/>
 			<div className="p-2 md:py-4 gap-2 flex flex-col h-full justify-between">
				<header className="flex flex-col gap-1">
					<h2 className="text-xl md:text-2xl">{service.name}</h2>

					<p className="text-foreground/70 text-sm text-balance line-clamp-4">
						{service.description}
					</p>
				</header>

				<nav className="flex">
					<Button
						onClick={() => onServiceSelect?.(service.id)}
						className="mt-2"
					>
						{t("check_availability")}
						<ChevronRight />
					</Button>
				</nav>
			</div>
		</li>
	);
};

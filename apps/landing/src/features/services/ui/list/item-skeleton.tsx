import { Button } from "@novahair/ui/button";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export const ServiceItemSkeleton = () => {
	const { t } = useTranslation();
	return (
		<li className="rounded-2xl overflow-hidden shadow bg-foreground/3 gap-1 md:gap-4 grid grid-cols-[1fr_2fr] items-center">
			<div className="bg-foreground/10 w-full grid place-items-center h-44" />
			<div className="p-2 md:py-4 gap-2 flex flex-col h-full justify-between">
				<header>
					<h2 className="text-xl md:text-2xl skeleton">lorem ipsum lorem</h2>

					<p className="text-foreground/80 text-balance skeleton line-clamp-4">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
						mollitia exercitationem enim, a iure
					</p>
				</header>
				<nav className="flex">
					<Button disabled>
						<span className="skeleton-inverted">{t("select")}</span>
						<ChevronRight />
					</Button>
				</nav>
			</div>
		</li>
	);
};

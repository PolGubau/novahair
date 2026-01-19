import { IconButton } from "@novahair/ui/icon-button";
import { Link } from "@tanstack/react-router";
import { t } from "i18next";
import { ChevronLeft } from "lucide-react";
import { copy } from "~/data/copy";

export const AppointmentFormHeader = () => {
	return (
		<header className="flex gap-2 w-full items-center p-4">
			<Link to="/">
				<IconButton variant="ghost" label={t("go_back_home")}>
					<ChevronLeft />
				</IconButton>
			</Link>
			<strong className="text-xl">{copy.name}</strong>
		</header>
	);
};

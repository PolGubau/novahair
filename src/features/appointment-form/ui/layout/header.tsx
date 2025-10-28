import { Link } from "@tanstack/react-router";
import { t } from "i18next";
import { ChevronLeft } from "lucide-react";
import { copy } from "~/shared/data/copy";

export const AppointmentFormHeader = () => {
	return (
		<header className="flex gap-4 w-full items-center p-4 justify-between">
			<Link to="/" className="flex gap-1 items-center">
				<ChevronLeft />
				{t("home")}
			</Link>
			<strong className="text-xl">{copy.name}</strong>

			<div className="flex justify-end gap-2 items-center">{/*  */}</div>
		</header>
	);
};

import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { copy } from "~/shared/data/copy";

export const AppointmentFormHeader = () => {
	return (
		<header className="flex gap-2 w-full items-center p-4">
			<Link to="/" className="flex gap-1 items-center">
				<ChevronLeft />
			</Link>
			<strong className="text-xl">{copy.name}</strong>
		</header>
	);
};

import { Button } from "@novahair/ui/button";
import { Link } from "@tanstack/react-router";
import { t } from "i18next";
import { ArrowRight } from "lucide-react";

export const BookButton = () => {
	return (
		<Link to={"/booking"}>
			<Button
				variant="secondary"
				className="rounded-full group flex gap-2 items-center pl-4! p-2 h-16 text-xl motion-preset-slide-up motion-delay-1500"
			>
				{t("book_appointment")}
				<span className="bg-background text-foreground rounded-full aspect-square size-0 group-hover:size-10 group-focus:size-10 translate-x-full group-hover:translate-x-0 group-focus:translate-x-0 transition-all flex items-center justify-center">
					<ArrowRight className="size-4 group-hover:size-5" />
				</span>
			</Button>
		</Link>
	);
};


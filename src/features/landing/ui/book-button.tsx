import { Link } from "@tanstack/react-router";
import { t } from "i18next";
import { Button } from "~/shared/ui/button";

export const BookButton = () => {
	return (
		<Link to="/book/choose-service">
			<Button
				variant="secondary"
				className="rounded-full group flex gap-2 items-center pl-4! p-2 h-16 text-xl motion-preset-slide-up motion-delay-1500"
			>
				{t("book_appointment")}
				<span className="bg-background text-foreground rounded-full aspect-square size-0 group-hover:size-10 group-focus:size-10 translate-x-full group-hover:translate-x-0 group-focus:translate-x-0 transition-all flex items-center justify-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
					>
						<title>Arrow Right</title>
						<path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
					</svg>
				</span>
			</Button>
		</Link>
	);
};

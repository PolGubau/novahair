import { t } from "i18next";
import { BookButton } from "./book-button";
import { Images } from "./hero/images";
import { Title } from "./title";

export const Hero = () => {
	return (
		<section className="flex flex-col items-center gap-8 max-w-7xl mx-auto px-4 min-h-[85vh]">
			<header className="flex flex-col gap-2 items-center">
				<Images />

				<Title />
				<strong className="text-center text-foreground/70 text-xl px-6 md:text-2xl text-balance animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1000">
					{t("hero_description")}
				</strong>
			</header>

			<BookButton />
		</section>
	);
};


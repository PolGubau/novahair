import { Link } from "@tanstack/react-router";
import { BookButton } from "./book-button";
import { Images } from "./hero/images";
import { Title } from "./title";

export const Hero = () => {
	return (
		<section className="flex flex-col items-center gap-8 max-w-7xl mx-auto px-4 min-h-[85vh]">
			<header className="flex flex-col gap-2 items-center">
				<Images />

				<Title />
				<strong className="text-center text-xl px-6 md:text-2xl text-balance motion-preset-slide-up motion-delay-1200">
					Renueva tu estilo. Redefine tu esencia
				</strong>
			</header>

			<BookButton />
		</section>
	);
};

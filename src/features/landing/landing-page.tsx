import { ParallaxImages } from "~/shared/ui/parallax-images";
import { BookButton } from "./ui/book-button";
import { Hero } from "./ui/hero";
import { Services } from "./ui/services";
import { Testimonials } from "./ui/testimonials";

export const LandingPage = () => {
	return (
		<main className="flex flex-col py-4 items-center justify-center overflow-x-hidden">
			<Hero />
			<ParallaxImages />
			<Services />
			<Testimonials />

			<div>
				<BookButton />
			</div>
		</main>
	);
};

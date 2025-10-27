import { ParallaxImages } from "@/shared/ui/parallax-images";
import { Hero } from "./ui/hero";

export const LandingPage = () => {
	return (
		<main className="flex flex-col py-16 items-center justify-center">
			<Hero />
			<ParallaxImages />
		</main>
	);
};

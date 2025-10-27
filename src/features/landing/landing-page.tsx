import { ParallaxImages } from "@/shared/ui/parallax-images";
import { Hero } from "./ui/hero";
import { Services } from "./ui/services";

export const LandingPage = () => {
	return (
		<main className="flex flex-col py-4 items-center justify-center overflow-x-hidden">
			<Hero />
			<ParallaxImages />
			<Services />

			<div className="h-[200vh]">hola</div>
		</main>
	);
};

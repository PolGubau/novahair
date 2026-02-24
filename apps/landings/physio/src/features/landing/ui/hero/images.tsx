import gsap from "gsap";
import { useEffect } from "react";

export const Images = () => {
	useEffect(() => {
		const images = document.querySelectorAll(".hero_imgs img");

		gsap.fromTo(
			images,
			{ y: -200, x: (i) => [-80, 0, 80][i], opacity: 0, rotate: 0 },
			{
				y: 0,
				x: 0,
				opacity: 1,
				rotate: (i) => [-3, 0, 6][i],
				duration: 0.8,
				delay: 1.5,
				stagger: 0.15,
				ease: "power3.out",
			},
		);
	}, []);

	return (
		<div className="hero_imgs flex gap-4 lg:gap-20 items-end relative justify-center">
			<img
				src="/images/1.webp"
				alt="PhysioCare"
				className="w-36 lg:w-64 z-10 max-lg:-mr-28 object-contain -rotate-3 rounded-xl shadow-lg"
			/>
			<img
				src="/images/2.webp"
				alt="PhysioCare"
				className="w-64 lg:w-96 mb-20 mt-10 lg:mt-24 rounded-xl shadow-lg"
			/>
			<img
				src="/images/3.webp"
				alt="PhysioCare"
				className="w-36 lg:w-64 z-10 max-lg:-ml-28 object-contain mb-12 rotate-6 rounded-xl shadow-lg"
			/>
		</div>
	);
};


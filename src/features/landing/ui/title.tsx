"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

export const Title = () => {
	const titleRef = useRef<HTMLHeadingElement>(null);

	const text = "NOVAHAIR";

	useEffect(() => {
		if (!titleRef.current) return;

		const letters =
			titleRef.current.querySelectorAll<HTMLSpanElement>(".letter span");

		// timeline con stagger desde el centro
		gsap.fromTo(
			letters,
			{ yPercent: 100, opacity: 0 },
			{
				yPercent: 0,
				opacity: 1,
				duration: 0.6,
				ease: "power3.out",
				stagger: { each: 0.05, from: "center" },
			},
		);
	}, []);

	return (
		<h1
			ref={titleRef}
			className="text-5xl md:text-6xl lg:text-9xl font-bold text-center mt-36"
		>
			{text.split("").map((letter, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: its ok
<span key={i} className="letter inline-block overflow-hidden relative">
					<span className="block will-change-transform">{letter}</span>
				</span>
			))}
		</h1>
	);
};

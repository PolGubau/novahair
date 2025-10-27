"use client";

import {
	type MotionValue,
	motion,
	useScroll,
	useTransform,
} from "framer-motion";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";

const images = [
	"/images/1.webp",
	"/images/2.webp",
	"/images/3.webp",
	"/images/4.webp",
	"/images/5.webp",
	"/images/6.webp",
	"/images/7.webp",
	"/images/8.webp",
	"/images/9.webp",
	"/images/10.webp",
	"/images/11.webp",
	"/images/12.webp",
	"/images/13.webp",
];

const ParallaxImages = () => {
	const gallery = useRef<HTMLDivElement>(null);
	const [dimension, setDimension] = useState({ width: 0, height: 0 });

	const { scrollYProgress } = useScroll({
		target: gallery,
		offset: ["start end", "end start"],
	});

	const { height } = dimension;
	const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
	const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
	const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
	const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

	useEffect(() => {
		const lenis = new Lenis();

		const raf = (time: number) => {
			lenis.raf(time);
			requestAnimationFrame(raf);
		};

		const resize = () => {
			setDimension({ width: window.innerWidth, height: window.innerHeight });
		};

		window.addEventListener("resize", resize);
		requestAnimationFrame(raf);
		resize();

		return () => {
			window.removeEventListener("resize", resize);
		};
	}, []);

	return (
		<section
			ref={gallery}
			className="scroll-scale-in relative box-border rounded-[200px] flex h-[175vh] gap-[2vw] overflow-hidden bg-white p-[2vw]"
		>
			<Column images={[images[0], images[1], images[2]]} y={y} />
			<Column images={[images[3], images[4], images[5]]} y={y2} />
			<Column images={[images[6], images[7], images[8]]} y={y3} />
			<Column images={[images[6], images[7], images[8]]} y={y4} />
		</section>
	);
};

type ColumnProps = {
	images: string[];
	y: MotionValue<number>;
};

const Column = ({ images, y }: ColumnProps) => {
	return (
		<motion.div
			className="relative -top-[45%] flex h-full w-1/4 min-w-[250px] flex-col gap-[2vw] first:top-[-45%] nth-2:top-[-95%] nth-3:top-[-45%] nth-4:top-[-75%]"
			style={{ y }}
		>
			{images.map((src) => (
				<div key={src} className="relative h-full w-full overflow-hidden">
					<img
						src={src}
						alt="Parallax"
						className="pointer-events-none object-cover"
					/>
				</div>
			))}
		</motion.div>
	);
};

export { ParallaxImages };

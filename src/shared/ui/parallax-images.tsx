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
	const y = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
	const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 2.8]);
	const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
	const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);
	const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

	useEffect(() => {
		const resize = () => {
			setDimension({ width: window.innerWidth, height: window.innerHeight });
		};

		window.addEventListener("resize", resize);
		resize();

		return () => {
			window.removeEventListener("resize", resize);
		};
	}, []);

	return (
		<motion.section
			ref={gallery}
			style={{ scale }}
			className="scroll-scale-in relative grid sm:grid-cols-2 lg:grid-cols-4 h-[150vh] gap-[2vw] overflow-hidden bg-foreground/10 p-[2vw]"
		>
			<Column images={[images[0], images[1], images[2], images[3]]} y={y} />
			<Column
				images={[
					images[3],
					images[4],
					images[5],
					images[6],
					images[1],
					images[3],
				]}
				y={y2}
				className="max-sm:hidden"
			/>
			<Column
				images={[images[6], images[7], images[8], images[9], images[7]]}
				y={y3}
				className="max-lg:hidden"
			/>
			<Column
				images={[images[9], images[10], images[11], images[12], images[10]]}
				y={y4}
				className="max-lg:hidden"
			/>
		</motion.section>
	);
};

type ColumnProps = {
	images: string[];
	y: MotionValue<number>;
	className?: string;
};

const Column = ({ images, y, className }: ColumnProps) => {
	return (
		<motion.div
			className={`relative flex h-full w-full min-w-[250px] flex-col gap-[2vw] 
				first:top-[-60%] 
				nth-2:top-[-80%] 
				nth-3:top-[-45%] 
				nth-4:top-[-85%] 
				 ${className}`}
			style={{ y }}
		>
			{images.map((src) => (
				<div key={src} className="relative h-full w-full overflow-hidden">
					<img
						src={src}
						alt="Parallax"
						className="pointer-events-none object-cover h-full"
					/>
				</div>
			))}
		</motion.div>
	);
};

export { ParallaxImages };

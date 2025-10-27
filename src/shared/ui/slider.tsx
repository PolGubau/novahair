"use client";

import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import "./slider.css";
import {
	Autoplay,
	EffectCoverflow,
	Navigation,
	Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Slider = ({
	images,
	className,
	showPagination = false,
	showNavigation = false,
	loop = true,
	autoplay = false,
	spaceBetween = 40,
}: {
	images: { src: string; alt: string }[];
	className?: string;
	showPagination?: boolean;
	showNavigation?: boolean;
	loop?: boolean;
	autoplay?: boolean;
	spaceBetween?: number;
}) => {
	const css = `
  .Carousal_001 {
    padding-bottom: 50px !important;
  }
  `;
	return (
		<motion.div
			initial={{ opacity: 0, translateY: 20 }}
			animate={{ opacity: 1, translateY: 0 }}
			transition={{
				duration: 0.3,
				delay: 0.5,
			}}
			className={cn("w-3xl relative", className)}
		>
			<style>{css}</style>

			<Swiper
				spaceBetween={spaceBetween}
				autoplay={
					autoplay
						? {
								delay: 1500,
								disableOnInteraction: false,
							}
						: false
				}
				effect="coverflow"
				grabCursor={true}
				centeredSlides={true}
				loop={loop}
				slidesPerView={2.43}
				coverflowEffect={{
					rotate: 0,
					slideShadows: false,
					stretch: 0,
					depth: 100,
					modifier: 2.5,
				}}
				pagination={
					showPagination
						? {
								clickable: true,
							}
						: false
				}
				navigation={
					showNavigation
						? {
								nextEl: ".swiper-button-next",
								prevEl: ".swiper-button-prev",
							}
						: false
				}
				className="Carousal_001"
				modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
			>
				{images.map((image, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: index está bien aquí
					<SwiperSlide key={index} className="h-80! w-full border">
						<img
							className="h-full w-full object-cover"
							src={image.src}
							alt={image.alt}
						/>
					</SwiperSlide>
				))}
				{showNavigation && (
					<div>
						<div className="swiper-button-next after:hidden">
							<ChevronRightIcon className="h-6 w-6 text-white" />
						</div>
						<div className="swiper-button-prev after:hidden">
							<ChevronLeftIcon className="h-6 w-6 text-white" />
						</div>
					</div>
				)}
			</Swiper>
		</motion.div>
	);
};

export { Slider };

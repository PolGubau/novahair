"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
	Autoplay,
	EffectCoverflow,
	Navigation,
	Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { cn } from "@/lib/cn";
import "./slider.css";

type SliderProps<T> = {
	items: T[];
	className?: string;
	showPagination?: boolean;
	showNavigation?: boolean;
	loop?: boolean;
	autoplay?: boolean;
	slidesPerView?: number;
	spaceBetween?: number;
	render: (item: T, index: number) => React.ReactNode;
};

const Slider = <T,>({
	items,
	className,
	showPagination = true,
	showNavigation = false,
	loop = true,
	slidesPerView = 2.46,
	autoplay = true,
	spaceBetween = 40,
	render,
}: SliderProps<T>) => {
	const css = `
  .Carousal_001 {
    padding-bottom: 50px !important;
  }
  `;
	return (
		<div className={cn("w-full relative h-full", className)}>
			<style>{css}</style>

			<Swiper
				spaceBetween={spaceBetween}
				autoplay={
					autoplay
						? {
								delay: 2000,
								disableOnInteraction: false,
							}
						: false
				}
				effect="coverflow"
				grabCursor={true}
				centeredSlides={true}
				loop={loop}
				slidesPerView={slidesPerView}
				coverflowEffect={{
					rotate: 5,
					slideShadows: false,
					stretch: 10,
					depth: 100,
					modifier: 2,
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
				{items.map((item, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: index está bien aquí
					<SwiperSlide key={index}>{render(item, index)}</SwiperSlide>
				))}
				{showNavigation && (
					<div>
						<div className="swiper-button-next after:hidden z-50">
							<ChevronRightIcon className="h-6 w-6 text-foreground" />
						</div>
						<div className="swiper-button-prev after:hidden z-50">
							<ChevronLeftIcon className="h-6 w-6 text-foreground" />
						</div>
					</div>
				)}
			</Swiper>
		</div>
	);
};

export { Slider };

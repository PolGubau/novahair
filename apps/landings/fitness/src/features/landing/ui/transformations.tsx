"use client";

import { motion } from "framer-motion";
import { testimonials } from "../../../data/testimonials";
import { Star } from "lucide-react";

export const Transformations = () => {
	return (
		<section className="py-24 px-4 overflow-hidden">
			<div className="max-w-7xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
						Transformaciones reales
					</h2>
					<p className="text-xl text-muted-foreground">
						Historias de éxito de nuestra comunidad
					</p>
				</motion.div>

				{/* Horizontal scroll container */}
				<div className="relative">
					<div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
						{testimonials.map((testimonial, index) => (
							<motion.div
								key={testimonial.name}
								initial={{ opacity: 0, x: 50 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								className="flex-shrink-0 w-[350px] snap-center"
							>
								<div className="h-full bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2 border-orange-500/30 rounded-xl p-6 hover:border-orange-500 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20">
									{/* Stars */}
									<div className="flex gap-1 mb-4">
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												className="size-4 text-orange-500"
												fill="currentColor"
											/>
										))}
									</div>

									{/* Testimonial */}
									<p className="text-muted-foreground mb-6 italic">
										"{testimonial.body}"
									</p>

									{/* Author */}
									<div className="flex items-center gap-3 pt-4 border-t border-orange-500/30">
										<img
											src={testimonial.img}
											alt={testimonial.name}
											className="size-12 rounded-full ring-2 ring-orange-500/50"
										/>
										<div>
											<div className="font-bold">
												{testimonial.name}
											</div>
											<div className="text-sm text-muted-foreground">
												{testimonial.username}
											</div>
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</div>

					{/* Gradient overlays for scroll indication */}
					<div className="absolute left-0 top-0 bottom-6 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none" />
					<div className="absolute right-0 top-0 bottom-6 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />
				</div>
			</div>

			<style>{`
				.scrollbar-hide::-webkit-scrollbar {
					display: none;
				}
				.scrollbar-hide {
					-ms-overflow-style: none;
					scrollbar-width: none;
				}
			`}</style>
		</section>
	);
};


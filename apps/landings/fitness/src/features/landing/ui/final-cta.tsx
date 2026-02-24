"use client";

import { Button } from "@novahair/ui/button";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";
import { copy } from "../../../data/copy";

export const FinalCTA = () => {
	return (
		<section className="py-32 px-4 relative overflow-hidden">
			{/* Animated background */}
			<div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-red-500 to-purple-500 opacity-90" />
			
			{/* Pattern overlay */}
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:32px_32px]" />

			<div className="max-w-4xl mx-auto text-center relative">
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="space-y-8"
				>
					{/* Icon */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className="inline-flex items-center justify-center size-20 rounded-full bg-white/20 backdrop-blur-sm"
					>
						<Zap className="size-10 text-white" fill="white" />
					</motion.div>

					{/* Title */}
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.3 }}
						className="text-5xl md:text-6xl lg:text-7xl font-black text-white"
					>
						{copy.cta.title}
					</motion.h2>

					{/* Subtitle */}
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.4 }}
						className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto"
					>
						{copy.cta.subtitle}
					</motion.p>

					{/* CTA Button */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.5 }}
						className="pt-4"
					>
						<Link to="/booking">
							<Button 
								size="lg"
								className="text-xl px-12 h-16 bg-white text-orange-500 hover:bg-white/90 font-black shadow-2xl group"
							>
								{copy.cta.button}
								<ArrowRight className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
							</Button>
						</Link>
					</motion.div>

					{/* Trust indicators */}
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ delay: 0.6 }}
						className="flex flex-wrap justify-center gap-8 pt-8 text-white/80 text-sm"
					>
						<div className="flex items-center gap-2">
							<Zap className="size-4" />
							<span>Sin permanencia</span>
						</div>
						<div className="flex items-center gap-2">
							<Zap className="size-4" />
							<span>Primera clase gratis</span>
						</div>
						<div className="flex items-center gap-2">
							<Zap className="size-4" />
							<span>Cancela cuando quieras</span>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};


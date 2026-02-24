"use client";

import { Button } from "@novahair/ui/button";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { copy } from "../../../data/copy";
import { useEffect, useRef } from "react";

export const HeroFitness = () => {
	const videoRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Animación de fondo pulsante
		if (videoRef.current) {
			const interval = setInterval(() => {
				videoRef.current?.classList.add("scale-105");
				setTimeout(() => {
					videoRef.current?.classList.remove("scale-105");
				}, 500);
			}, 3000);

			return () => clearInterval(interval);
		}
	}, []);

	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
			{/* Animated background */}
			<div 
				ref={videoRef}
				className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-red-500/20 to-purple-500/20 -z-10 transition-transform duration-500"
			/>
			
			{/* Grid pattern overlay */}
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10" />

			<div className="max-w-7xl mx-auto px-4 py-20 text-center">
				{/* Tagline */}
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5 }}
					className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full mb-8 border border-orange-500/30"
				>
					<Zap className="size-4 text-orange-500" />
					<span className="text-sm font-bold uppercase tracking-wider">
						{copy.tagline}
					</span>
				</motion.div>

				{/* Main title */}
				<motion.h1
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.6 }}
					className="text-7xl md:text-8xl lg:text-9xl font-black mb-6 bg-gradient-to-r from-orange-500 via-red-500 to-purple-500 bg-clip-text text-transparent"
				>
					{copy.hero.title}
				</motion.h1>

				{/* Subtitle */}
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4, duration: 0.6 }}
					className="text-2xl md:text-3xl font-bold mb-12 text-muted-foreground"
				>
					{copy.hero.subtitle}
				</motion.p>

				{/* Features */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6, duration: 0.6 }}
					className="flex flex-wrap justify-center gap-6 mb-12"
				>
					{copy.hero.features.map((feature, index) => (
						<motion.div
							key={feature}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.8 + index * 0.1 }}
							className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border"
						>
							<Check className="size-5 text-green-500" />
							<span className="font-medium">{feature}</span>
						</motion.div>
					))}
				</motion.div>

				{/* CTA */}
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 1, duration: 0.5 }}
				>
					<Link to="/booking">
						<Button 
							size="lg" 
							className="text-xl px-12 h-16 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold shadow-xl hover:shadow-2xl transition-all"
						>
							{copy.hero.cta}
							<Zap className="size-5 ml-2" />
						</Button>
					</Link>
				</motion.div>

				{/* Floating stats */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 1.2, duration: 0.6 }}
					className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto"
				>
					<div className="text-center">
						<div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
							500+
						</div>
						<div className="text-sm text-muted-foreground mt-2">Miembros activos</div>
					</div>
					<div className="text-center">
						<div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
							50+
						</div>
						<div className="text-sm text-muted-foreground mt-2">Clases semanales</div>
					</div>
					<div className="text-center">
						<div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-500 to-orange-500 bg-clip-text text-transparent">
							10+
						</div>
						<div className="text-sm text-muted-foreground mt-2">Años de experiencia</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};


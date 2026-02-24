"use client";

import { Button } from "@novahair/ui/button";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Award, Clock, MapPin, Phone } from "lucide-react";
import { copy } from "../../../data/copy";

export const HeroMedical = () => {
	return (
		<section className="min-h-[90vh] flex items-center justify-center px-4 py-10 relative overflow-hidden">
			{/* Background gradient */}
			<div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-primary/10 -z-10" />

			<div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
				{/* Left side - Content */}
				<motion.div
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
					className="space-y-6"
				>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="inline-block px-4 py-2 bg-primary/10 rounded-full text-balance text-sm font-medium text-primary"
					>
						✓ Clínica certificada por el Colegio Oficial de Fisioterapeutas
					</motion.div>

					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
						className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
					>
						{copy.hero.title}
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
						className="text-xl text-muted-foreground max-w-xl"
					>
						{copy.hero.subtitle}
					</motion.p>

					{/* Quick contact info */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.45 }}
						className="flex flex-col gap-3 pt-2"
					>
					 
						<div className="flex items-center gap-2 text-muted-foreground">
							<MapPin className="size-4 text-primary" />
							<span className="text-sm">Avenida Salud, 15 - Barcelona</span>
						</div>
						<div className="flex items-center gap-2 text-muted-foreground">
							<Clock className="size-4 text-primary" />
							<span className="text-sm">Lun-Vie: 9:00-20:00 | Sáb: 10:00-14:00</span>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.5 }}
						className="flex flex-wrap gap-4 pt-4"
					>
						<Link to="/booking">
							<Button size="lg" className="text-lg px-8 h-14 rounded-2xl group">
								{copy.hero.cta}
								<ArrowRight className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
							</Button>
						</Link>
					</motion.div>

					{/* Stats */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.6 }}
						className="grid grid-cols-3 gap-6 pt-8 border-t"
					>
						<div>
							<div className="text-3xl font-bold text-primary">15+</div>
							<div className="text-sm text-muted-foreground">Años de experiencia</div>
						</div>
						<div>
							<div className="text-3xl font-bold text-primary">5000+</div>
							<div className="text-sm text-muted-foreground">Pacientes tratados</div>
						</div>
						<div>
							<div className="text-3xl font-bold text-primary">95%</div>
							<div className="text-sm text-muted-foreground">Tasa de éxito</div>
						</div>
					</motion.div>
				</motion.div>

				{/* Right side - Real images grid */}
				<motion.div
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className="relative"
				>
					<div className="relative grid grid-cols-2 gap-4">
						{/* Main large image */}
						<div className="col-span-2 aspect-16/10 rounded-2xl overflow-hidden shadow-2xl">
							<img
								src="/images/0.webp"
								alt="Clínica PhysioCare - Instalaciones modernas"
								className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
							/>
						</div>

						{/* Two smaller images */}
						<div className="aspect-square rounded-xl overflow-hidden shadow-lg">
							<img
								src="/images/1.webp"
								alt="Tratamiento de fisioterapia"
								className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
							/>
						</div>
						<div className="aspect-square rounded-xl overflow-hidden shadow-lg">
							<img
								src="/images/2.webp"
								alt="Equipamiento profesional"
								className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
							/>
						</div>
					</div>

					{/* Floating card */}
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 1, duration: 0.6 }}
						className="absolute max-md:hidden -bottom-6 -left-6 bg-background/80 border-2 border-primary/20 rounded-xl p-6 shadow-2xl backdrop-blur-sm"
					>
						<div className="flex items-center gap-4">
							<div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
								<Award className="size-6 text-primary" />
							</div>
							<div>
								<div className="font-bold">Certificados</div>
								<div className="text-sm text-muted-foreground">Colegio Oficial</div>
							</div>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};


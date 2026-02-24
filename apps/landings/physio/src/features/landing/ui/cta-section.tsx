"use client";

import { Button } from "@novahair/ui/button";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Calendar, CheckCircle } from "lucide-react";

export const CTASection = () => {
	return (
		<section className="py-24 px-4 bg-gradient-to-br from-primary/10 via-primary/5 to-background relative overflow-hidden">
			{/* Decorative elements */}
			<div className="absolute top-0 right-0 size-96 bg-primary/5 rounded-full blur-3xl" />
			<div className="absolute bottom-0 left-0 size-96 bg-primary/5 rounded-full blur-3xl" />
			
			<div className="max-w-5xl mx-auto relative">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center space-y-8"
				>
					<div className="space-y-4">
						<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
							¿Listo para recuperar tu bienestar?
						</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Reserva tu primera consulta hoy y da el primer paso hacia una vida sin dolor
						</p>
					</div>

					{/* Benefits */}
					<div className="grid md:grid-cols-3 gap-6 py-8">
						<div className="flex items-center gap-3 justify-center">
							<CheckCircle className="size-5 text-primary flex-shrink-0" />
							<span className="text-sm font-medium">Primera consulta con descuento</span>
						</div>
						<div className="flex items-center gap-3 justify-center">
							<CheckCircle className="size-5 text-primary flex-shrink-0" />
							<span className="text-sm font-medium">Sin listas de espera</span>
						</div>
						<div className="flex items-center gap-3 justify-center">
							<CheckCircle className="size-5 text-primary flex-shrink-0" />
							<span className="text-sm font-medium">Profesionales certificados</span>
						</div>
					</div>

					{/* CTA Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
						<Link to="/booking">
							<Button size="lg" className="text-lg px-10 h-16 rounded-2xl group shadow-lg">
								<Calendar className="size-5 mr-2" />
								Reservar cita online
								<ArrowRight className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
							</Button>
						</Link>
						<a href="tel:+34932456789">
							<Button size="lg" variant="outline" className="text-lg px-10 h-16 rounded-2xl">
								<Phone className="size-5 mr-2" />
								Llamar ahora
							</Button>
						</a>
					</div>

					{/* Trust indicators */}
					<div className="pt-8 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
						<div className="flex items-center gap-2">
							<CheckCircle className="size-4 text-primary" />
							<span>Cancelación gratuita 24h antes</span>
						</div>
						<div className="flex items-center gap-2">
							<CheckCircle className="size-4 text-primary" />
							<span>Aceptamos seguros médicos</span>
						</div>
						<div className="flex items-center gap-2">
							<CheckCircle className="size-4 text-primary" />
							<span>Parking gratuito</span>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};


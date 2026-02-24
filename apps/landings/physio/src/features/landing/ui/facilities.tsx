"use client";

import { motion } from "framer-motion";

const facilities = [
	{
		image: "/images/3.webp",
		title: "Sala de rehabilitación",
		description: "Equipamiento de última generación"
	},
	{
		image: "/images/4.webp",
		title: "Zona de terapia manual",
		description: "Espacios cómodos y privados"
	},
	{
		image: "/images/5.webp",
		title: "Área de ejercicios",
		description: "Gimnasio terapéutico completo"
	}
];

export const Facilities = () => {
	return (
		<section className="py-24 px-4 bg-muted/30">
			<div className="max-w-7xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl md:text-5xl font-bold mb-4">
						Nuestras instalaciones
					</h2>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
						Espacios diseñados para tu comodidad y recuperación
					</p>
				</motion.div>

				<div className="grid md:grid-cols-3 gap-8">
					{facilities.map((facility, index) => (
						<motion.div
							key={facility.title}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className="group"
						>
							<div className="relative aspect-4/3 rounded-xl overflow-hidden mb-4 shadow-lg">
								<img
									src={facility.image}
									alt={facility.title}
									className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
							</div>
							<h3 className="text-xl font-bold mb-2">{facility.title}</h3>
							<p className="text-muted-foreground">{facility.description}</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};


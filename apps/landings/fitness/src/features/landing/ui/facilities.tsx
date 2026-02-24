"use client";

import { motion } from "framer-motion";
import { Dumbbell, Users, Sparkles } from "lucide-react";

const facilities = [
	{
		title: "Zona de Cardio",
		description: "Más de 30 máquinas de cardio de última generación: cintas de correr con pantallas táctiles, bicicletas estáticas, elípticas y remos. Todas con programas personalizables y monitorización de frecuencia cardíaca.",
		image: "/images/3.webp",
		icon: Dumbbell,
	},
	{
		title: "Sala de Clases Grupales",
		description: "Espacio amplio de 150m² con suelo amortiguado, espejos de pared a pared, sistema de sonido profesional y climatización. Capacidad para 20 personas con todo el equipamiento necesario para cada clase.",
		image: "/images/4.webp",
		icon: Users,
	},
	{
		title: "Vestuarios Premium",
		description: "Vestuarios amplios y modernos con duchas individuales, taquillas de seguridad, secadores de pelo, zona de aseo completa y sauna. Limpieza continua durante todo el día para tu máxima comodidad.",
		image: "/images/5.webp",
		icon: Sparkles,
	},
];

export const Facilities = () => {
	return (
		<section className="py-24 px-4 bg-gradient-to-b from-muted/20 to-background">
			<div className="max-w-7xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center space-y-4 mb-16"
				>
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 bg-clip-text text-transparent">
						Nuestras instalaciones
					</h2>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
						Más de 500m² equipados con la mejor tecnología para tu entrenamiento
					</p>
				</motion.div>

				<div className="grid md:grid-cols-3 gap-8">
					{facilities.map((facility, index) => {
						const Icon = facility.icon;
						return (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								className="group"
							>
								<div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 shadow-lg">
									<img
										src={facility.image}
										alt={facility.title}
										className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
										onError={(e) => {
											// Fallback si la imagen no existe
											e.currentTarget.src = `https://placehold.co/800x600/1a1a1a/orange?text=${encodeURIComponent(facility.title)}`;
										}}
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								</div>
								
								<div className="space-y-3">
									<div className="flex items-center gap-3">
										<div className="p-2 rounded-lg bg-gradient-to-br from-orange-500/20 to-purple-600/20 border border-orange-500/30">
											<Icon className="size-5 text-orange-500" />
										</div>
										<h3 className="text-2xl font-bold">{facility.title}</h3>
									</div>
									<p className="text-muted-foreground leading-relaxed">
										{facility.description}
									</p>
								</div>
							</motion.div>
						);
					})}
				</div>

				{/* Additional info */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-orange-500/10 via-red-500/10 to-purple-600/10 border border-orange-500/20"
				>
					<div className="grid md:grid-cols-4 gap-6 text-center">
						<div>
							<div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
								500m²
							</div>
							<div className="text-sm text-muted-foreground mt-1">De instalaciones</div>
						</div>
						<div>
							<div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
								+100
							</div>
							<div className="text-sm text-muted-foreground mt-1">Máquinas y equipos</div>
						</div>
						<div>
							<div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
								24/7
							</div>
							<div className="text-sm text-muted-foreground mt-1">Limpieza continua</div>
						</div>
						<div>
							<div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
								WiFi
							</div>
							<div className="text-sm text-muted-foreground mt-1">Gratis de alta velocidad</div>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};


"use client";

import { motion } from "framer-motion";
import { copy } from "../../../data/copy";
import { Award, Dumbbell } from "lucide-react";

export const TrainersSection = () => {
	return (
		<section className="py-24 px-4">
			<div className="max-w-7xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
						{copy.trainers.title}
					</h2>
					<p className="text-xl text-muted-foreground">
						{copy.trainers.subtitle}
					</p>
				</motion.div>

				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
					{copy.trainers.members.map((trainer, index) => (
						<motion.div
							key={trainer.name}
							initial={{ opacity: 0, y: 30, rotateY: -15 }}
							whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							whileHover={{ y: -10, rotateY: 5 }}
							className="group perspective-1000"
						>
							<div className="relative bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl overflow-hidden border-2 border-orange-500/30 hover:border-orange-500 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/30">
								{/* Trainer image placeholder */}
								<div className="aspect-[3/4] bg-gradient-to-br from-orange-500/20 to-red-500/20 relative overflow-hidden">
									<div className="absolute inset-0 flex items-center justify-center">
										<Dumbbell className="size-24 text-orange-500/30" />
									</div>
									
									{/* Overlay gradient */}
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
									
									{/* Name overlay */}
									<div className="absolute bottom-0 left-0 right-0 p-4">
										<h3 className="text-2xl font-black text-white mb-1">
											{trainer.name}
										</h3>
										<p className="text-orange-400 font-bold text-sm">
											{trainer.role}
										</p>
									</div>
								</div>

								{/* Info section */}
								<div className="p-4 space-y-3 bg-card">
									<div className="flex items-start gap-2">
										<Award className="size-4 text-orange-500 mt-0.5 flex-shrink-0" />
										<div className="text-sm">
											<div className="font-medium text-muted-foreground mb-1">
												Especialidad
											</div>
											<div className="font-bold">
												{trainer.specialization}
											</div>
										</div>
									</div>

									<div className="pt-2 border-t">
										<div className="text-xs text-muted-foreground mb-1">
											Certificaciones
										</div>
										<div className="text-xs font-medium">
											{trainer.certifications}
										</div>
									</div>
								</div>

								{/* Shine effect on hover */}
								<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};


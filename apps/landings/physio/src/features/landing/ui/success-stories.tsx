"use client";

import { motion } from "framer-motion";
import { testimonials } from "../../../data/testimonials";
import { Quote } from "lucide-react";

export const SuccessStories = () => {
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
						Casos de éxito
					</h2>
					<p className="text-xl text-muted-foreground">
						Historias reales de recuperación de nuestros pacientes
					</p>
				</motion.div>

				<div className="grid md:grid-cols-2 gap-6">
					{testimonials.map((testimonial, index) => (
						<motion.div
							key={testimonial.name}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className="group"
						>
							<div className="h-full bg-card border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/50 relative pr-20">
								{/* Quote icon */}
								<div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
									<Quote className="size-12 text-primary" />
								</div>

								{/* Content */}
								<div className="relative space-y-4">
									{/* Testimonial text */}
									<p className="text-muted-foreground italic">
										"{testimonial.body}"
									</p>

									{/* Author */}
									<div className="flex items-center gap-3 pt-4 border-t">
										<img
											src={testimonial.img}
											alt={testimonial.name}
											className="size-12 rounded-full"
										/>
										<div>
											<div className="font-bold">
												{testimonial.name}
											</div>
											<div className="text-sm text-muted-foreground">
												Paciente verificado
											</div>
										</div>
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};


"use client";

import { useServices } from "@novahair/client";
import { Button } from "@novahair/ui/button";
import { Skeleton } from "@novahair/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Clock, Users, Flame } from "lucide-react";
import { copy } from "../../../data/copy";

const ClassSkeleton = () => (
	<div className="border rounded-lg p-4 space-y-3">
		<Skeleton className="h-6 w-3/4" />
		<Skeleton className="h-4 w-full" />
		<Skeleton className="h-10 w-full" />
	</div>
);

export const ClassesSchedule = () => {
	const tenantId = import.meta.env.VITE_TENANT_ID;
	const { data: services, isLoading } = useServices(tenantId);

	return (
		<section className="py-24 px-4 bg-gradient-to-b from-background to-muted/30">
			<div className="max-w-7xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
						{copy.schedule.title}
					</h2>
					<p className="text-xl text-muted-foreground">
						{copy.schedule.subtitle}
					</p>
				</motion.div>

				{isLoading ? (
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
						{[...Array(6)].map((_, i) => (
							<ClassSkeleton key={i} />
						))}
					</div>
				) : (
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
						{services?.map((service, index) => (
							<motion.div
								key={service.id}
								initial={{ opacity: 0, scale: 0.9 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.3, delay: index * 0.05 }}
								className="group"
							>
								<div className="h-full border-2 rounded-xl p-6 bg-card hover:border-orange-500 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20 relative overflow-hidden">
									{/* Gradient overlay on hover */}
									<div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />

									{/* Intensity indicator */}
									<div className="absolute top-4 right-4">
										<div className="flex gap-1">
											{[...Array(3)].map((_, i) => (
												<Flame
													key={i}
													className={`size-4 ${
														i < 2 ? "text-orange-500" : "text-muted-foreground/30"
													}`}
													fill="currentColor"
												/>
											))}
										</div>
									</div>

									{/* Content */}
									<div className="space-y-4">
										<div>
											<h3 className="text-2xl font-black mb-2 group-hover:text-orange-500 transition-colors">
												{service.name}
											</h3>
											{service.description && (
												<p className="text-sm text-muted-foreground line-clamp-2">
													{service.description}
												</p>
											)}
										</div>

										{/* Info */}
										<div className="flex items-center gap-4 text-sm">
											<div className="flex items-center gap-1.5">
												<Clock className="size-4 text-orange-500" />
												<span>{service.duration} min</span>
											</div>
											<div className="flex items-center gap-1.5">
												<Users className="size-4 text-orange-500" />
												<span>Max 15</span>
											</div>
										</div>

										{/* Price and CTA */}
										<div className="flex items-center justify-between pt-4 border-t">
											<div className="text-2xl font-black text-orange-500">
												{service.price}€
											</div>
											<Link to="/booking" search={{ serviceId: service.id }}>
												<Button 
													size="sm"
													className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold"
												>
													Reservar
												</Button>
											</Link>
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				)}

				{/* View all classes CTA */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.5 }}
					className="text-center mt-12"
				>
					<Link to="/booking">
						<Button 
							size="lg"
							variant="outline"
							className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold"
						>
							Ver todas las clases
						</Button>
					</Link>
				</motion.div>
			</div>
		</section>
	);
};


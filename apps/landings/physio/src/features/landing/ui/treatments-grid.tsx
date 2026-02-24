"use client";

import { useServices } from "@novahair/client";
import { Button } from "@novahair/ui/button";
import { Skeleton } from "@novahair/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { copy } from "../../../data/copy";

const TreatmentSkeleton = () => (
	<div className="border rounded-xl p-6 space-y-4">
		<Skeleton className="h-48 w-full rounded-lg" />
		<Skeleton className="h-6 w-3/4" />
		<Skeleton className="h-4 w-full" />
		<Skeleton className="h-4 w-full" />
		<Skeleton className="h-10 w-full" />
	</div>
);

export const TreatmentsGrid = () => {
	const tenantId = import.meta.env.VITE_TENANT_ID;
	const { services, isLoading } = useServices(tenantId);

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
					<h2 className="text-4xl md:text-5xl font-bold mb-4">
						{copy.treatments.title}
					</h2>
					<p className="text-xl text-muted-foreground">
						{copy.treatments.subtitle}
					</p>
				</motion.div>

				{isLoading ? (
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{[...Array(6)].map((_, i) => (
							<TreatmentSkeleton key={i} />
						))}
					</div>
				) : (
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{services?.map((service, index) => (
							<motion.div
								key={service.id}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								className="group"
							>
								<div className="h-full border rounded-xl overflow-hidden bg-card hover:shadow-xl transition-all duration-300 hover:border-primary/50">
									{/* Image */}
									<div className="aspect-video bg-linear-to-br from-primary/10 to-primary/5 relative overflow-hidden">
										{service.imageUrl ? (
											<img
												src={service.imageUrl}
												alt={service.name}
												className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
											/>
										) : (
											<div className="w-full h-full flex items-center justify-center">
												<span className="text-4xl opacity-20">🏥</span>
											</div>
										)}
									</div>

									{/* Content */}
									<div className="p-6 space-y-4">
										<div>
											<h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
												{service.name}
											</h3>
											{service.description && (
												<p className="text-sm text-muted-foreground line-clamp-2">
													{service.description}
												</p>
											)}
										</div>

										<div className="flex items-center justify-between pt-4 border-t">
											<div className="flex items-center gap-2 text-sm text-muted-foreground">
												<Clock className="size-4" />
												<span>{service.durationMin} min</span>
											</div>
											<div className="text-lg font-bold text-primary">
												{service.priceCents / 100}€
											</div>
										</div>

										<Link to="/booking" search={{ serviceId: service.id }}>
											<Button className="w-full group/btn">
												Reservar ahora
												<ArrowRight className="size-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
											</Button>
										</Link>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				)}
			</div>
		</section>
	);
};


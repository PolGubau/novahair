"use client";

import { motion } from "framer-motion";
import { Dumbbell, Calendar, Clock, Users } from "lucide-react";
import { copy } from "../../../data/copy";

const iconMap = {
	dumbbell: Dumbbell,
	calendar: Calendar,
	clock: Clock,
	users: Users,
};

export const BenefitsSection = () => {
	return (
		<section className="py-24 px-4 bg-muted/30 relative overflow-hidden">
			{/* Decorative elements */}
			<div className="absolute top-20 left-10 size-72 bg-orange-500/10 rounded-full blur-3xl" />
			<div className="absolute bottom-20 right-10 size-96 bg-red-500/10 rounded-full blur-3xl" />

			<div className="max-w-7xl mx-auto relative">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<h2 className="text-5xl md:text-6xl font-black mb-4">
						{copy.benefits.title}
					</h2>
				</motion.div>

				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
					{copy.benefits.items.map((benefit, index) => {
						const Icon = iconMap[benefit.icon as keyof typeof iconMap];
						
						return (
							<motion.div
								key={benefit.title}
								initial={{ opacity: 0, scale: 0.8 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: index * 0.1 }}
								whileHover={{ scale: 1.05 }}
								className="group"
							>
								<div className="h-full p-6 rounded-xl bg-card border-2 border-transparent hover:border-orange-500 transition-all duration-300 relative overflow-hidden">
									{/* Animated background */}
									<div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-red-500/0 group-hover:from-orange-500/10 group-hover:to-red-500/10 transition-all duration-300" />

									{/* Content */}
									<div className="relative space-y-4">
										{/* Icon */}
										<div className="size-16 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
											<Icon className="size-8 text-white" />
										</div>

										{/* Text */}
										<div>
											<h3 className="text-xl font-black mb-2 group-hover:text-orange-500 transition-colors">
												{benefit.title}
											</h3>
											<p className="text-muted-foreground text-sm">
												{benefit.description}
											</p>
										</div>
									</div>
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
};


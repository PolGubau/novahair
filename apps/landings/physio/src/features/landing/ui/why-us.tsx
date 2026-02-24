"use client";

import { motion } from "framer-motion";
import { Award, Activity, Heart, TrendingUp } from "lucide-react";
import { copy } from "../../../data/copy";

const iconMap = {
	award: Award,
	activity: Activity,
	heart: Heart,
	"trending-up": TrendingUp,
};

export const WhyUs = () => {
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
						{copy.whyUs.title}
					</h2>
				</motion.div>

				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
					{copy.whyUs.reasons.map((reason, index) => {
						const Icon = iconMap[reason.icon as keyof typeof iconMap];
						
						return (
							<motion.div
								key={reason.title}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								className="group relative"
							>
								<div className="h-full p-6 rounded-xl border bg-card hover:shadow-lg transition-all duration-300 hover:border-primary/50">
									{/* Icon */}
									<div className="mb-4 size-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
										<Icon className="size-7 text-primary" />
									</div>

									{/* Content */}
									<h3 className="text-xl font-bold mb-2">
										{reason.title}
									</h3>
									<p className="text-muted-foreground">
										{reason.description}
									</p>

									{/* Hover effect */}
									<div className="absolute inset-0 rounded-xl bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
};


"use client";

import { motion } from "framer-motion";
import { copy } from "../../../data/copy";
import { User } from "lucide-react";

export const TeamSection = () => {
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
						{copy.team.title}
					</h2>
					<p className="text-xl text-muted-foreground">
						{copy.team.subtitle}
					</p>
				</motion.div>

				<div className="grid md:grid-cols-3 gap-8">
					{copy.team.members.map((member, index) => (
						<motion.div
							key={member.name}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.15 }}
							className="group"
						>
							<div className="bg-card rounded-xl overflow-hidden border hover:shadow-xl transition-all duration-300 hover:border-primary/50">
								{/* Image placeholder */}
								<div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
									<User className="size-24 text-primary/30" />
								</div>

								{/* Content */}
								<div className="p-6 space-y-3">
									<div>
										<h3 className="text-2xl font-bold mb-1">
											{member.name}
										</h3>
										<p className="text-primary font-medium">
											{member.role}
										</p>
									</div>

									<div className="space-y-2 pt-2 border-t">
										<div className="flex items-start gap-2">
											<span className="text-sm font-medium text-muted-foreground">
												Especialidad:
											</span>
											<span className="text-sm">
												{member.specialization}
											</span>
										</div>
										<div className="flex items-start gap-2">
											<span className="text-sm font-medium text-muted-foreground">
												Experiencia:
											</span>
											<span className="text-sm">
												{member.experience}
											</span>
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


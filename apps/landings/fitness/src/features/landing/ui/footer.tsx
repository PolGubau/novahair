"use client";

import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Clock } from "lucide-react";
import { copy } from "~/data/copy";

export const Footer = () => {
	return (
		<footer className="bg-gradient-to-b from-background to-muted/30 border-t border-border">
			<div className="max-w-7xl mx-auto px-4 py-16">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
					{/* About */}
					<div className="space-y-4">
						<h3 className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 bg-clip-text text-transparent">
							{copy.name}
						</h3>
						<p className="text-muted-foreground text-sm leading-relaxed">
							El gimnasio más completo de Madrid. Transforma tu cuerpo y tu vida con nosotros.
						</p>
						<div className="flex gap-3">
							<a
								href="https://facebook.com"
								target="_blank"
								rel="noopener noreferrer"
								className="p-2 rounded-lg bg-muted hover:bg-orange-500/20 hover:text-orange-500 transition-colors"
								aria-label="Facebook"
							>
								<Facebook className="size-5" />
							</a>
							<a
								href="https://instagram.com"
								target="_blank"
								rel="noopener noreferrer"
								className="p-2 rounded-lg bg-muted hover:bg-orange-500/20 hover:text-orange-500 transition-colors"
								aria-label="Instagram"
							>
								<Instagram className="size-5" />
							</a>
							<a
								href="https://twitter.com"
								target="_blank"
								rel="noopener noreferrer"
								className="p-2 rounded-lg bg-muted hover:bg-orange-500/20 hover:text-orange-500 transition-colors"
								aria-label="Twitter"
							>
								<Twitter className="size-5" />
							</a>
							<a
								href="https://youtube.com"
								target="_blank"
								rel="noopener noreferrer"
								className="p-2 rounded-lg bg-muted hover:bg-orange-500/20 hover:text-orange-500 transition-colors"
								aria-label="YouTube"
							>
								<Youtube className="size-5" />
							</a>
						</div>
					</div>

					{/* Contact */}
					<div className="space-y-4">
						<h4 className="text-lg font-semibold">Contacto</h4>
						<div className="space-y-3 text-sm">
							<a
								href={`tel:${copy.contact.phone}`}
								className="flex items-start gap-3 text-muted-foreground hover:text-orange-500 transition-colors group"
							>
								<Phone className="size-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
								<span>{copy.contact.phone}</span>
							</a>
							<a
								href={`mailto:${copy.contact.email}`}
								className="flex items-start gap-3 text-muted-foreground hover:text-orange-500 transition-colors group"
							>
								<Mail className="size-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
								<span>{copy.contact.email}</span>
							</a>
							<div className="flex items-start gap-3 text-muted-foreground">
								<MapPin className="size-4 mt-0.5 flex-shrink-0" />
								<span>{copy.contact.address}</span>
							</div>
						</div>
					</div>

					{/* Hours */}
					<div className="space-y-4">
						<h4 className="text-lg font-semibold">Horario</h4>
						<div className="space-y-3 text-sm text-muted-foreground">
							<div className="flex items-start gap-3">
								<Clock className="size-4 mt-0.5 flex-shrink-0" />
								<div className="space-y-1">
									<p className="font-medium text-foreground">Lunes - Viernes</p>
									<p>6:00 - 23:00</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<Clock className="size-4 mt-0.5 flex-shrink-0" />
								<div className="space-y-1">
									<p className="font-medium text-foreground">Sábado</p>
									<p>8:00 - 21:00</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<Clock className="size-4 mt-0.5 flex-shrink-0" />
								<div className="space-y-1">
									<p className="font-medium text-foreground">Domingo</p>
									<p>9:00 - 15:00</p>
								</div>
							</div>
						</div>
					</div>

					{/* Quick Links */}
					<div className="space-y-4">
						<h4 className="text-lg font-semibold">Enlaces rápidos</h4>
						<nav className="flex flex-col gap-3 text-sm">
							<Link
								to="/booking"
								className="text-muted-foreground hover:text-orange-500 transition-colors hover:translate-x-1 inline-block"
							>
								Reservar clase
							</Link>
							<a
								href="#clases"
								className="text-muted-foreground hover:text-orange-500 transition-colors hover:translate-x-1 inline-block"
							>
								Horario de clases
							</a>
							<a
								href="#entrenadores"
								className="text-muted-foreground hover:text-orange-500 transition-colors hover:translate-x-1 inline-block"
							>
								Nuestro equipo
							</a>
							<a
								href="#instalaciones"
								className="text-muted-foreground hover:text-orange-500 transition-colors hover:translate-x-1 inline-block"
							>
								Instalaciones
							</a>
							<a
								href="#faq"
								className="text-muted-foreground hover:text-orange-500 transition-colors hover:translate-x-1 inline-block"
							>
								Preguntas frecuentes
							</a>
						</nav>
					</div>
				</div>

				{/* Bottom bar */}
				<div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
					<p>{copy.footer.copyright}</p>
					<div className="flex gap-6">
						<a href="#" className="hover:text-orange-500 transition-colors">
							Términos y condiciones
						</a>
						<a href="#" className="hover:text-orange-500 transition-colors">
							Política de privacidad
						</a>
						<a href="#" className="hover:text-orange-500 transition-colors">
							Política de cancelación
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};


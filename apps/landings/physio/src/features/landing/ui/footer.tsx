import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin } from "lucide-react";
import { copy } from "~/data/copy";

export const Footer = () => {
	return (
		<footer className="bg-muted/50 border-t">
			<div className="max-w-7xl mx-auto px-4 py-16">
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
					{/* About */}
					<div>
						<h3 className="text-2xl font-bold mb-4">{copy.name}</h3>
						<p className="text-muted-foreground mb-6">
							{copy.description}
						</p>
						<div className="flex gap-4">
							<a
								href="https://facebook.com"
								target="_blank"
								rel="noopener noreferrer"
								className="size-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
							>
								<Facebook className="size-5 text-primary" />
							</a>
							<a
								href="https://instagram.com"
								target="_blank"
								rel="noopener noreferrer"
								className="size-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
							>
								<Instagram className="size-5 text-primary" />
							</a>
							<a
								href="https://linkedin.com"
								target="_blank"
								rel="noopener noreferrer"
								className="size-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
							>
								<Linkedin className="size-5 text-primary" />
							</a>
						</div>
					</div>

					{/* Contact */}
					<div>
						<h4 className="font-bold mb-4">Contacto</h4>
						<div className="space-y-3">
							<a href="tel:+34932456789" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
								<Phone className="size-4" />
								<span>(+34) 932 456 789</span>
							</a>
							<a href="mailto:hola@physiocare.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
								<Mail className="size-4" />
								<span>hola@physiocare.com</span>
							</a>
							<div className="flex items-start gap-2 text-muted-foreground">
								<MapPin className="size-4 mt-1 flex-shrink-0" />
								<div>
									<div>Avenida Salud, 15</div>
									<div>08001 Barcelona, España</div>
								</div>
							</div>
						</div>
					</div>

					{/* Hours */}
					<div>
						<h4 className="font-bold mb-4">Horario</h4>
						<div className="space-y-3 text-muted-foreground">
							<div className="flex items-start gap-2">
								<Clock className="size-4 mt-1 flex-shrink-0" />
								<div>
									<div className="font-medium text-foreground">Lunes - Viernes</div>
									<div>9:00 - 20:00</div>
								</div>
							</div>
							<div className="flex items-start gap-2">
								<Clock className="size-4 mt-1 flex-shrink-0" />
								<div>
									<div className="font-medium text-foreground">Sábado</div>
									<div>10:00 - 14:00</div>
								</div>
							</div>
							<div className="flex items-start gap-2">
								<Clock className="size-4 mt-1 flex-shrink-0" />
								<div>
									<div className="font-medium text-foreground">Domingo</div>
									<div>Cerrado</div>
								</div>
							</div>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h4 className="font-bold mb-4">Enlaces rápidos</h4>
						<div className="space-y-3">
							<Link to="/booking" className="block text-muted-foreground hover:text-primary transition-colors">
								Reservar cita
							</Link>
							<Link to="/" className="block text-muted-foreground hover:text-primary transition-colors">
								Nuestros tratamientos
							</Link>
							<Link to="/" className="block text-muted-foreground hover:text-primary transition-colors">
								Equipo profesional
							</Link>
							<Link to="/" className="block text-muted-foreground hover:text-primary transition-colors">
								Preguntas frecuentes
							</Link>
						</div>
					</div>
				</div>

				{/* Bottom bar */}
				<div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
					<p className="text-sm text-muted-foreground">
						{copy.footer.copyright}
					</p>
					<div className="flex gap-6 text-sm text-muted-foreground">
						<Link to="/" className="hover:text-primary transition-colors">
							Política de privacidad
						</Link>
						<Link to="/" className="hover:text-primary transition-colors">
							Términos y condiciones
						</Link>
						<Link to="/" className="hover:text-primary transition-colors">
							Aviso legal
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};


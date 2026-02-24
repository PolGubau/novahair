import { HeroMedical } from "./ui/hero-medical";
import { WhyUs } from "./ui/why-us";
import { TreatmentsGrid } from "./ui/treatments-grid";
import { TeamSection } from "./ui/team-section";
import { SuccessStories } from "./ui/success-stories";
import { Facilities } from "./ui/facilities";
import { FAQ } from "./ui/faq";
import { CTASection } from "./ui/cta-section";
import { Footer } from "./ui/footer";
import { copy } from "~/data/copy";
import { Link } from "@tanstack/react-router";
import { Button } from "@novahair/ui";
import { ChevronRight, Phone } from "lucide-react";

export const PhysioLanding = () => {
	return (
		<main className="min-h-screen">
			<title>{copy.name} - {copy.tagline}</title>

			{/* Top banner */}
			<div className="flex justify-center gap-2 items-center p-3 bg-primary text-primary-foreground">
				<span className="text-sm font-medium">
					✨ Descuento del 20% en tu primera sesión
				</span>
				<Link to="/booking" className="ml-2 text-sm font-bold underline hover:no-underline">
					¡Reserva ahora!
				</Link>
			</div>

			{/* Header */}
			<header className="bg-background/95 backdrop-blur-md sticky top-0 z-50 border-b">
				<div className="py-4 px-4 max-w-7xl mx-auto flex justify-between items-center gap-4">
					<Link to="/" className="text-2xl font-bold text-primary">
						{copy.name}
					</Link>

					<nav className="hidden md:flex items-center gap-6 text-sm font-medium">
						<a href="#tratamientos" className="hover:text-primary transition-colors">
							Tratamientos
						</a>
						<a href="#equipo" className="hover:text-primary transition-colors">
							Equipo
						</a>
						<a href="#instalaciones" className="hover:text-primary transition-colors">
							Instalaciones
						</a>
						<a href="#faq" className="hover:text-primary transition-colors">
							FAQ
						</a>
					</nav>

					<div className="flex items-center gap-3">
						 
						<Link to="/booking">
							<Button size="sm" className="font-semibold">
								Reservar cita
								<ChevronRight className="size-4 ml-1" />
							</Button>
						</Link>
					</div>
				</div>
			</header>

			{/* Content */}
			<HeroMedical />
			<WhyUs />
			<div id="tratamientos">
				<TreatmentsGrid />
			</div>
			<div id="equipo">
				<TeamSection />
			</div>
			<div id="instalaciones">
				<Facilities />
			</div>
			<SuccessStories />
			<div id="faq">
				<FAQ />
			</div>
			<CTASection />
			<Footer />
		</main>
	);
};

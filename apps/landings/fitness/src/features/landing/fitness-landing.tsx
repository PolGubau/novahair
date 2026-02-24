import { HeroFitness } from "./ui/hero-fitness";
import { BenefitsSection } from "./ui/benefits-section";
import { ClassesSchedule } from "./ui/classes-schedule";
import { TrainersSection } from "./ui/trainers-section";
import { Transformations } from "./ui/transformations";
import { Facilities } from "./ui/facilities";
import { FAQ } from "./ui/faq";
import { FinalCTA } from "./ui/final-cta";
import { Footer } from "./ui/footer";

export const FitnessLanding = () => {
	return (
		<main className="min-h-screen">
			<HeroFitness />
			<BenefitsSection />
			<div id="clases">
				<ClassesSchedule />
			</div>
			<div id="entrenadores">
				<TrainersSection />
			</div>
			<Transformations />
			<div id="instalaciones">
				<Facilities />
			</div>
			<div id="faq">
				<FAQ />
			</div>
			<FinalCTA />
			<Footer />
		</main>
	);
};


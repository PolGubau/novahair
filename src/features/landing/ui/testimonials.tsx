import { testimonials } from "@/shared/data/testimonials";
import { Slider } from "@/shared/ui/slider";

export const Testimonials = () => {
	return (
		<section className="flex flex-col items-center gap-4 max-w-7xl w-full mx-auto px-4 min-h-[85vh] py-12">
			<h2 className="text-4xl lg:text-6xl">Nuestros Servicios</h2>
			<p className="text-center text-pretty max-w-md mb-16">
				Ofrecemos una amplia gama de servicios para satisfacer todas tus
				necesidades de cuidado del cabello y estilo.
			</p>

			<Slider className="" images={testimonials} showPagination loop />
		</section>
	);
};

import { testimonials } from "@/shared/data/testimonials";
import { Slider } from "@/shared/ui/slider";

export const Testimonials = () => {
	const commonProps = {
		items: testimonials,
		render: (item: (typeof testimonials)[number], index: number) => {
			return (
				<div
					key={index}
					className="flex flex-col gap-4 overflow-hidden pb-6 bg-white rounded-3xl shadow-lg h-full"
				>
					<img src={item.src} alt={item.name} />
					<p className="text-lg text-balance text-foreground/80 italic px-4">
						"{item.testimonial}"
					</p>
					<h3 className="px-6">{item.name}</h3>
				</div>
			);
		},
		showPagination: true,
		loop: true,
	};

	return (
		<section className="flex flex-col items-center gap-4 max-w-7xl w-full mx-auto px-4 min-h-[85vh] overflow-visible py-12">
			<h2 className="text-4xl lg:text-6xl">Algunos Testimonios</h2>
			<p className="text-center text-pretty max-w-md mb-16">
				Lo que nuestros clientes dicen sobre nosotros 💇‍♀️✨
			</p>

			<div className="relative  w-full   motion-preset-blur-up-lg">
				<div className="absolute inset-0 pointer-events-none flex bg-linear-to-r from-background to-20% to-background/5 z-10 h-full"></div>
				<div className="absolute inset-0 flex bg-linear-to-l pointer-events-none from-background to-20% to-background/5 z-10 h-full"></div>

				<div className="max-md:hidden">
					<Slider {...commonProps} slidesPerView={2.46} />
				</div>
				<div className="md:hidden">
					<Slider {...commonProps} slidesPerView={1.2} />
				</div>
			</div>
		</section>
	);
};

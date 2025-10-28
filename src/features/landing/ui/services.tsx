import { services } from "~/shared/data/services";

export const Services = () => {
	return (
		<section className="flex flex-col items-center gap-4 max-w-7xl w-full mx-auto px-4 min-h-[85vh] py-12">
			<h2 className="text-4xl lg:text-6xl">Nuestros Servicios</h2>
			<p className="text-center text-pretty max-w-md mb-16">
				Ofrecemos una amplia gama de servicios para satisfacer todas tus
				necesidades de cuidado del cabello y estilo.
			</p>

			<ul className="grid md:grid-cols-2 gap-4 w-full">
				{services.map((service) => (
					<li
						key={service.id}
						className="w-full bg-white/70 rounded-3xl p-4 md:p-6 md:pb-8 flex flex-col gap-2"
						style={{ filter: "url(#squicircle)" }}
					>
						<span className="bg-primary/5 rounded-full px-2 w-fit">
							{service.category}
						</span>
						<h3 className="text-xl">{service.title}</h3>

						<p className="text-foreground/80">{service.description}</p>
					</li>
				))}
			</ul>
		</section>
	);
};

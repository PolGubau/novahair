import { services } from "@/shared/data/services";

export const Services = () => {
	return (
		<section className="flex flex-col items-center gap-12 max-w-7xl w-full mx-auto px-4 min-h-[85vh] py-12">
			<h2 className="text-4xl lg:text-6xl">Nuestros Servicios</h2>

			<ul className="grid grid-cols-3 gap-4 w-full">
				{services.map((service) => (
					<li
						key={service.id}
						className="w-full bg-white/70 rounded-3xl p-6 md:p-12 shadow-lg"
						style={{ filter: "url(#squicircle)" }}
					>
						{service.title}
					</li>
				))}
			</ul>
		</section>
	);
};

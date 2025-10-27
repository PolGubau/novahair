import { Link } from "@tanstack/react-router";

export const Hero = () => {
	return (
		<section className="flex flex-col items-center gap-8 max-w-7xl mx-auto px-4 min-h-[90vh]">
			<header className="flex flex-col gap-2 items-center">
				<div className="flex gap-20 items-end">
					<img
						src="/images/1.webp"
						alt="NovaHair Logo"
						className="w-64 object-contain -rotate-3 rounded-xl shadow-lg"
					/>
					<img
						src="/images/4.webp"
						alt="NovaHair Logo"
						className="w-96 h- mt-24 rounded-xl shadow-lg"
					/>
					<img
						src="/images/3.webp"
						alt="NovaHair Logo"
						className="w-64 object-contain mb-12 rotate-6 rounded-xl shadow-lg"
					/>
				</div>

				<h1 className="text-9xl font-bold text-center mt-36">NOVAHAIR</h1>
				<strong className="text-center text-2xl">
					Renueva tu estilo. Redefine tu esencia
				</strong>
			</header>

			<Link
				to="/book/choose-service"
				className="rounded-full group flex gap-2 items-center border border-primary/40 hover:border-primary pl-4 p-2 text-xl h-16"
			>
				Book an appointment
				<span className="bg-primary rounded-full aspect-square size-0 group-hover:size-10 translate-x-full group-hover:translate-x-0 transition-all flex items-center justify-center text-background">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="#e3e3e3"
					>
						<title>Arrow Right</title>
						<path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
					</svg>
				</span>
			</Link>
		</section>
	);
};

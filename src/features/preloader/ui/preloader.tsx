import { motion } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef } from "react";

type Props = {
	isReady: boolean;
};

/**
 * Pantalla de carga inicial animada con GSAP
 */
export const Preloader = ({ isReady }: Props) => {
	const ref = useRef<HTMLOutputElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		// Aparece el preloader al montar
		gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.5 });

		if (isReady) {
			// Desaparece el preloader cuando isReady es true
			gsap.to(el, {
				opacity: 0,
				translateY: -100,
				duration: 1,
				onComplete: () => {
					if (el.parentNode) {
						el.parentNode.removeChild(el);
					}
				},
			});
		}
	}, [isReady]);

	return (
		<output
			ref={ref}
			className="fixed inset-0 z-50 flex items-center justify-center bg-background motion-preset-fade"
			aria-live="polite"
		>
			<div className="flex flex-col items-center gap-4">
				<div className="flex items-center gap-4">
					{/* Spinner SVG */}
					<svg
						className="h-10 w-10 text-primary animate-spin"
						viewBox="0 0 50 50"
						aria-hidden="true"
					>
						<title>Spinner</title>
						<circle
							cx="25"
							cy="25"
							r="20"
							fill="none"
							stroke="currentColor"
							strokeWidth="5"
							strokeLinecap="round"
							strokeDasharray="31.4 31.4"
						/>
					</svg>

					{/* Brand with subtle pulsing/scale animation */}
					<p className="text-2xl md:text-4xl font-semibold animate-pulse">
						NOVAHAIR
					</p>
				</div>

				{/* Loading text with animated dots */}
				<div className="text-sm text-muted-foreground flex items-center gap-2">
					<span>Cargando</span>
					<span className="inline-flex items-center gap-1" aria-hidden>
						<span
							className="h-1.5 w-1.5 rounded-full bg-muted animate-bounce"
							style={{ animationDelay: "0s" }}
						/>
						<span
							className="h-1.5 w-1.5 rounded-full bg-muted animate-bounce"
							style={{ animationDelay: "0.15s" }}
						/>
						<span
							className="h-1.5 w-1.5 rounded-full bg-muted animate-bounce"
							style={{ animationDelay: "0.3s" }}
						/>
					</span>
				</div>
			</div>
		</output>
	);
};

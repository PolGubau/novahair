import { useEffect, useState } from "react";

export function useCalendarSizing(end: number) {
	const [dimensions, setDimensions] = useState({
		height: 400, // fallback mínimo
		pixelsPerMinute: 0.5,
	});

	useEffect(() => {
		const calculateDimensions = (end: number) => {
			// Estimar height disponible (viewport - header/footer aproximado)
			const windowHeight = window.innerHeight;
			const estimatedHeaderFooter = 220; // px aproximados para header, footer, padding
			const availableHeight = Math.max(
				100,
				windowHeight - estimatedHeaderFooter,
			);

			// Calcular pixels por minuto para ocupar todo el height disponible
			const totalMinutes = end * 60;
			const pixelsPerMinute = availableHeight / totalMinutes;

			setDimensions({
				height: availableHeight,
				pixelsPerMinute: Math.max(0.3, Math.min(1.5, pixelsPerMinute)), // límites razonables
			});
		};

		calculateDimensions(end);
		window.addEventListener("resize", () => calculateDimensions(end));
		return () =>
			window.removeEventListener("resize", () => calculateDimensions(end));
	}, [end]);

	return dimensions;
}

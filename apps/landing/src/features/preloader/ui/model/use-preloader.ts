import { useEffect, useState } from "react";

/**
 * Hook que detecta cuando la app está lista (assets, fonts, etc.)
 * @returns isReady - boolean que indica si todo está cargado
 */
export function usePreloader() {
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		const handleLoad = () => setIsReady(true);

		if (document.readyState === "complete") {
			handleLoad();
		} else {
			window.addEventListener("load", handleLoad);
		}

		return () => window.removeEventListener("load", handleLoad);
	}, []);

	return { isReady };
}

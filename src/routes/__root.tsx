/// <reference types="vite/client" />

import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import gsap from "gsap";
import ReactLenis from "lenis/react";
import { useEffect } from "react";
import { usePreloader } from "~/features/preloader/ui/model/use-preloader";
import { Preloader } from "~/features/preloader/ui/preloader";
import { Devtools } from "~/shared/ui/dev-tools";
import { SquiCircleFilterLayout } from "~/shared/ui/squicircle";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "NOVAHAIR - Tu nueva peluquería de confianza",
			},
			{
				name: "description",
				content: "Descubre todos nuestros servicios de corte, color y peinado.",
			},
			{
				property: "og:title",
				content: "NOVAHAIR - Tu nueva peluquería de confianza",
			},
			{ property: "og:type", content: "website" },
			{
				property: "og:description",
				content: "Descubre todos nuestros servicios de corte, color y peinado.",
			},
			{
				property: "og:image",
				content: "/images/1.webp",
			},
			{
				name: "twitter:card",
				content: "summary_large_image",
			},
			{
				name: "twitter:description",
				content: "Descubre todos nuestros servicios de corte, color y peinado.",
			},
			{
				name: "twitter:image",
				content: "/images/1.webp",
			},
			{
				name: "twitter:title",
				content: "NOVAHAIR - Tu nueva peluquería de confianza",
			},
			{
				name: "author",
				content: "Destacat.cat - Pol Gubau Amores",
			},
			{
				name: "keywords",
				content:
					"peluquería, corte de pelo, coloración, peinados, tratamientos capilares, NOVAHAIR",
			},
			{
				name: "robots",
				content: "index, follow",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "icon",
				href: "/favicon.svg",
			},
		],
	}),

	shellComponent: RootDocument,
	notFoundComponent: () => <div>404 - Not Found</div>,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const { isReady } = usePreloader();

	useEffect(() => {
		if (isReady) {
			// Inicia tus animaciones GSAP cuando ya está todo cargado
			gsap.from(".fade-in", { opacity: 0, y: 20, duration: 1 });
		}
	}, [isReady]);

	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<ReactLenis root>
					{!isReady && <Preloader isReady={isReady} />}

					<div className="fade-in">{children}</div>
					<SquiCircleFilterLayout />
				</ReactLenis>
				<Devtools />
				<Scripts />
			</body>
		</html>
	);
}

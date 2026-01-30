/// <reference types="vite/client" />

import { Devtools } from "@novahair/ui/dev-tools";
import { RootProvider } from "@novahair/utils";
import {
	HeadContent,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import ReactLenis from "lenis/react";
import { t } from "i18next";
import { usePreloader } from "~/features/preloader/ui/model/use-preloader";
import { Preloader } from "~/features/preloader/ui/preloader";
import { SquiCircleFilterLayout } from "~/shared/ui/squicircle";
import appCss from "../styles.css?url";
import i18n from "~/shared/i18n/setup";


export const Route = createRootRouteWithContext()({
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
	notFoundComponent: NotFound,
});

function NotFound() {
	;
	return <div>{t("not_found")}</div>;
}

function RootDocument({ children }: { children: React.ReactNode }) {
	const { isReady } = usePreloader();
	return (
		<html lang={i18n.language}>
			<head>
				<HeadContent />
			</head>
			<body>
				<RootProvider>
					<ReactLenis root>
						<Preloader isReady={isReady} />
						<div className="min-h-screen grid w-full">
						  {children} 
						</div>
						<SquiCircleFilterLayout />
					</ReactLenis>
				</RootProvider>
				<Devtools />
				<Scripts />
			</body>
		</html>
	);
}

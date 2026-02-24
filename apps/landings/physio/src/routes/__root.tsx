/// <reference types="vite/client" />

import { Devtools } from "@novahair/ui/dev-tools";
import {
	HeadContent,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { t } from "i18next";
import appCss from "../styles.css?url";
import i18n from "~/shared/i18n/setup";
import { getContext, Provider } from "~/integrations/tanstack-query/root-provider";

const { queryClient } = getContext();

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
				title: "PHYSIOCARE - Tu clínica de fisioterapia de confianza",
			},
			{
				name: "description",
				content: "Descubre todos nuestros servicios de fisioterapia, rehabilitación y tratamientos especializados.",
			},
			{
				property: "og:title",
				content: "PHYSIOCARE - Tu clínica de fisioterapia de confianza",
			},
			{ property: "og:type", content: "website" },
			{
				property: "og:description",
				content: "Descubre todos nuestros servicios de fisioterapia, rehabilitación y tratamientos especializados.",
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
				content: "Descubre todos nuestros servicios de fisioterapia, rehabilitación y tratamientos especializados.",
			},
			{
				name: "twitter:image",
				content: "/images/1.webp",
			},
			{
				name: "twitter:title",
				content: "PHYSIOCARE - Tu clínica de fisioterapia de confianza",
			},
			{
				name: "author",
				content: "Destacat.cat - Pol Gubau Amores",
			},
			{
				name: "keywords",
				content:
					"fisioterapia, rehabilitación, terapia manual, lesiones deportivas, dolor de espalda, PHYSIOCARE",
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
	return <div>{t("not_found")}</div>;
}

function RootDocument({ children }: { children: React.ReactNode }) {
 	return (
		<html lang={i18n.language}>
			<head>
				<HeadContent />
			</head>
			<body>
				<Provider queryClient={queryClient}>
					<div className="min-h-screen grid w-full">
						{children}
					</div>
				</Provider>
				<Devtools />
				<Scripts />
			</body>
		</html>
	);
}


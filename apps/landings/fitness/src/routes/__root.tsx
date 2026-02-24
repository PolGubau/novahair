/// <reference types="vite/client" />

import { Devtools } from "@novahair/ui/dev-tools";
import { RootProvider } from "@novahair/utils";
import {
	HeadContent,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { t } from "i18next";
import appCss from "../styles.css?url";
import i18n from "~/shared/i18n/setup";
import { copy } from "../data/copy";

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
				title: `${copy.name} - ${copy.tagline}`,
			},
			{
				name: "description",
				content: copy.description,
			},
			{
				property: "og:title",
				content: `${copy.name} - ${copy.tagline}`,
			},
			{ property: "og:type", content: "website" },
			{
				property: "og:description",
				content: copy.description,
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
				content: copy.description,
			},
			{
				name: "twitter:image",
				content: "/images/1.webp",
			},
			{
				name: "twitter:title",
				content: `${copy.name} - ${copy.tagline}`,
			},
			{
				name: "author",
				content: "Destacat.cat - Pol Gubau Amores",
			},
			{
				name: "keywords",
				content:
					"gimnasio, fitness, entrenamiento personal, clases grupales, HIIT, spinning, yoga, crossfit, musculación, cardio, madrid",
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
				<RootProvider>
					<div className="min-h-screen grid w-full">
						{children}
					</div>
				</RootProvider>
				<Devtools />
				<Scripts />
			</body>
		</html>
	);
}


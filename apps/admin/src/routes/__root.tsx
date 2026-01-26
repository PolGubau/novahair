/// <reference types="vite/client" />

import { Devtools } from "@novahair/ui/dev-tools";
import { queryClientDefaultOptions } from "@novahair/utils";
import "@novahair/utils/i18n/setup";
import { i18nPromise } from "@novahair/utils/i18n/setup";
import i18n from "@novahair/utils/i18n/setup";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	HeadContent,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { MainLayout } from "~/app/layouts/main";
import appCss from "../styles.css?url";

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
	const { t } = useTranslation();
	return <div>{t("not_found")}</div>;
}

function RootDocument({ children }: { children: React.ReactNode }) {
	const [isI18nReady, setIsI18nReady] = useState(false);

	// Create QueryClient with default configuration
	const queryClient = useMemo(
		() =>
			new QueryClient({
				defaultOptions: queryClientDefaultOptions,
			}),
		[],
	);

	useEffect(() => {
		const initI18n = async () => {
			try {
				await i18nPromise;
				console.log("i18n promise resolved");
				setIsI18nReady(true);
			} catch (err) {
				console.error("i18n init failed:", err);
			}
		};

		initI18n();
	}, []);

	if (!isI18nReady) {
		return (
			<html>
				<head>
					<HeadContent />
				</head>
				<body>
					<div>Loading...</div>
					<Scripts />
				</body>
			</html>
		);
	}

	return (
		<html lang={i18n.language}>
			<head>
				<HeadContent />
			</head>
			<body>
				<QueryClientProvider client={queryClient}>
					<MainLayout>{children}</MainLayout>
				</QueryClientProvider>
				<Devtools />
				<Scripts />
			</body>
		</html>
	);
}

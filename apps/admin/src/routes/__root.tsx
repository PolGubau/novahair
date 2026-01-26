/// <reference types="vite/client" />

import "@novahair/utils/i18n/setup";
import { Devtools } from "@novahair/ui/dev-tools";
import i18n from "i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { MainLayout } from "~/app/layouts/main";
import appCss from "../styles.css?url";

type MyRouterContext = {};

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
	notFoundComponent: NotFound,
});

function NotFound() {
	const { t } = useTranslation();
	return <div>{t("not_found")}</div>;
}

function RootDocument({ children }: { children: React.ReactNode }) {
 
	// Create QueryClient with default configuration
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: (failureCount, error) => {
					if (failureCount >= 2) return false;

					const errorMessage =
						error instanceof Error ? error.message : String(error);

					// No reintentar errores 4xx (errores del cliente)
					if (/4\d{2}/.test(errorMessage)) return false;

					// No reintentar errores 500 (Internal Server Error)
					if (/500/.test(errorMessage)) return false;

					// Reintentar errores 503 (Service Unavailable) - puede ser temporal
					if (/503/.test(errorMessage)) return true;

					// Reintentar errores de red (sin código de estado)
					if (!/(\d{3})/.test(errorMessage)) return true;

					// Por defecto, no reintentar otros errores 5xx
					return false;
				},
				retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
			},
		},
	});

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

/// <reference types="vite/client" />

import { Devtools } from "@novahair/ui/dev-tools";
import { queryClientDefaultOptions } from "@novahair/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	HeadContent,
	Scripts,
	createRootRouteWithContext,
	useRouter,
} from "@tanstack/react-router";
import i18n from "i18next";
import { useEffect, useMemo } from "react";
import { MainLayout } from "~/app/layouts/main";
import { setSSRLanguage } from "~/shared/i18n/ssr-i18n";
import appCss from "../styles.css?url";
export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	beforeLoad: async () => {
		await setSSRLanguage();
	},
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
	return <div>{"not_found"}</div>;
}

function RootDocument({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	useEffect(() => {
		const handler = () => router.invalidate();
		i18n.on("languageChanged", handler);
		return () => i18n.off("languageChanged", handler);
	}, [i18n, router]);

	// Create QueryClient with default configuration
	const queryClient = useMemo(
		() =>
			new QueryClient({
				defaultOptions: queryClientDefaultOptions,
			}),
		[],
	);

	return (
		<html lang={i18n.language} suppressHydrationWarning>
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

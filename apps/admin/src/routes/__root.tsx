/// <reference types="vite/client" />

import { Devtools } from "@novahair/ui/dev-tools";
import { queryClientDefaultOptions } from "@novahair/utils";
import i18n from "@novahair/utils/i18n/setup";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
	useRouter,
} from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { MainLayout } from "~/app/layouts/main";
import { setSSRLanguage } from "~/shared/i18n/ssr-i18n";
import appCss from "../styles.css?url";
export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	beforeLoad: async () => {
		const language = await setSSRLanguage();
		return { language };
	},
	head: () => ({
		links: [
			{
				href: appCss,
				rel: "stylesheet",
			},
			{
				href: "/favicon.svg",
				rel: "icon",
			},
		],
		meta: [
			{
				charSet: "utf-8",
			},
			{
				content: "width=device-width, initial-scale=1",
				name: "viewport",
			},
			{
				title: "NOVAHAIR - Tu nueva peluquería de confianza",
			},
			{
				content: "Descubre todos nuestros servicios de corte, color y peinado.",
				name: "description",
			},
			{
				content: "NOVAHAIR - Tu nueva peluquería de confianza",
				property: "og:title",
			},
			{ content: "website", property: "og:type" },
			{
				content: "Descubre todos nuestros servicios de corte, color y peinado.",
				property: "og:description",
			},
			{
				content: "/images/1.webp",
				property: "og:image",
			},
			{
				content: "summary_large_image",
				name: "twitter:card",
			},
			{
				content: "Descubre todos nuestros servicios de corte, color y peinado.",
				name: "twitter:description",
			},
			{
				content: "/images/1.webp",
				name: "twitter:image",
			},
			{
				content: "NOVAHAIR - Tu nueva peluquería de confianza",
				name: "twitter:title",
			},
			{
				content: "Destacat.cat - Pol Gubau Amores",
				name: "author",
			},
			{
				content:
					"peluquería, corte de pelo, coloración, peinados, tratamientos capilares, NOVAHAIR",
				name: "keywords",
			},
			{
				content: "index, follow",
				name: "robots",
			},
		],
		scripts: [
			{
				children: `window.__SSR_LANGUAGE__ = "${i18n.language}";`,
			},
		],
	}),
	notFoundComponent: NotFound,

	shellComponent: RootDocument,
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

	useEffect(() => {
		const ssrLanguage = (window as any).__SSR_LANGUAGE__;
		if (ssrLanguage && ssrLanguage !== i18n.language) {
			i18n.changeLanguage(ssrLanguage);
		}
	}, []);

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

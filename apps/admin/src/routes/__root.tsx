/// <reference types="vite/client" />

import { Devtools } from "@novahair/ui/dev-tools";
import { RootProvider } from "@novahair/utils";
 import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
	useRouter,
} from "@tanstack/react-router";
 import { MainLayout } from "~/app/layouts/main";
import { setSSRLanguage } from "~/shared/i18n/ssr-i18n";
import appCss from "../styles.css?url";
import i18n from "~/shared/i18n/setup";
export const Route = createRootRouteWithContext()({
	ssr: false,
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
	}),
	notFoundComponent: NotFound,

	shellComponent: RootDocument,
});

function NotFound() {
	return <div>{"not_found"}</div>;
}

function RootDocument({ children }: { children: React.ReactNode }) {

	const router=useRouter()

 

	return (
		<html lang={i18n.language} suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body>
				<RootProvider onChangedLanguage={() => router.invalidate()}>
				<MainLayout>{children}</MainLayout>
				</RootProvider>
				<Devtools />
				<Scripts />
			</body>
		</html>
	);
}

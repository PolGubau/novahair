/// <reference types="vite/client" />

import { Devtools } from "@novahair/ui/dev-tools";
import "@novahair/utils/i18n/setup";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { MainLayout } from "~/app/layouts/main";
import { TenantGuard } from "~/shared/tenant";
import "../styles.css";

interface MyRouterContext {
	queryClient: QueryClient;
}

// Define search params schema for tenant ID
const rootSearchSchema = z.object({
	tenant: z.string().optional(),
});

export const Route = createRootRouteWithContext<MyRouterContext>()({
	validateSearch: rootSearchSchema,

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
				title: "NOVAHAIR Booking - Reserva tu cita",
			},
			{
				name: "description",
				content: "Sistema de reservas para peluquería y salones de belleza.",
			},
			{
				property: "og:title",
				content: "NOVAHAIR Booking - Reserva tu cita",
			},
			{ property: "og:type", content: "website" },
			{
				property: "og:description",
				content: "Sistema de reservas para peluquería y salones de belleza.",
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
				content: "Sistema de reservas para peluquería y salones de belleza.",
			},
			{
				name: "twitter:image",
				content: "/images/1.webp",
			},
			{
				name: "twitter:title",
				content: "NOVAHAIR Booking - Reserva tu cita",
			},
			{
				name: "author",
				content: "Destacat.cat - Pol Gubau Amores",
			},
			{
				name: "keywords",
				content:
					"reservas, citas, booking, peluquería, salón de belleza, NOVAHAIR",
			},
			{
				name: "robots",
				content: "index, follow",
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
	const { i18n } = useTranslation();

	return (
		<html lang={i18n.language}>
			<head>
				<HeadContent />
			</head>
			<body>
				<TenantGuard>
					<MainLayout>{children}</MainLayout>
				</TenantGuard>
				<Devtools />
				<Scripts />
			</body>
		</html>
	);
}

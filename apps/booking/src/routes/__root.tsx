/// <reference types="vite/client" />
import { Devtools } from "@novahair/ui/dev-tools";
import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { t } from "i18next";
import { z } from "zod";
import i18n from "~/shared/i18n/setup";
import "../styles.css";
import { Provider } from "~/integrations/tanstack-query/root-provider";
import type { getContext } from "~/integrations/tanstack-query/root-provider";
import { TenantGuard } from "~/shared/tenant/ui/tenant-guard";

// Define search params schema for tenant ID
const rootSearchSchema = z.object({
	tenant: z.string().optional(),
});

export const Route = createRootRouteWithContext<ReturnType<typeof getContext>>()({
	validateSearch: rootSearchSchema,
	ssr: false,


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
	return <div>{t("not_found")}</div>;
}

function RootDocument() {
	const { queryClient } = Route.useRouteContext();

	return (
		<html lang={i18n.language}>
			<head>
				<HeadContent />
			</head>
			<body>
				<Provider queryClient={queryClient}>
					<TenantGuard>
						<Outlet />
					</TenantGuard>
					<Devtools />
				</Provider>
				<Scripts />
			</body>
		</html>
	);
}

/// <reference types="vite/client" />
import { BookingApp } from "@novahair/booking-app";
import { Devtools } from "@novahair/ui/dev-tools";
import {
	HeadContent,
	Scripts,
	createRootRouteWithContext,
	useRouter,
} from "@tanstack/react-router";
import { t } from "i18next";
import { z } from "zod";
import i18n from "~/shared/i18n/setup";
import "../styles.css";
import { config } from "@novahair/utils";

// Define search params schema for tenant ID
const rootSearchSchema = z.object({
	tenant: z.string().optional(),
});

export const Route = createRootRouteWithContext()({
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

function RootDocument({ children }: { children: React.ReactNode }) {
	const router=useRouter()
	return (
		<html lang={i18n.language}>
			<head>
				<HeadContent />
			</head>
			<body>
				{/* <RootProvider onChangedLanguage={() => router.invalidate()}>
					<TenantGuard>
						<MainLayout>{children}</MainLayout>
					</TenantGuard>
				</RootProvider> */}
				<BookingApp tenantId={config.tenantId} />
				<Devtools />
				<Scripts />
			</body>
		</html>
	);
}

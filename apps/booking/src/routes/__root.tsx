/// <reference types="vite/client" />

import { Devtools } from "@novahair/ui/dev-tools";
import "@novahair/utils/i18n/setup";
import { i18nPromise } from "@novahair/utils/i18n/setup";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { useEffect, useState } from "react";
import { z } from "zod";
import { MainLayout } from "~/app/layouts/main";
import { TenantGuard } from "~/shared/tenant";
import "../styles.css";

interface MyRouterContext {
	// QueryClient is now created in RootDocument
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
	const [isI18nReady, setIsI18nReady] = useState(false);

	// Create QueryClient with the same configuration as in root-provider
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				// Estrategia de reintentos inteligente
				retry: (failureCount, error) => {
					// No reintentar si ya falló 2 veces
					if (failureCount >= 2) return false;

					// Parsear el error para determinar el código de estado
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

	useEffect(() => {
		const initI18n = async () => {
			try {
				await i18nPromise;
				console.log('i18n promise resolved');
				setIsI18nReady(true);
			} catch (err) {
				console.error('i18n init failed:', err);
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
					<TenantGuard>
						<MainLayout>{children}</MainLayout>
					</TenantGuard>
				</QueryClientProvider>
				<Devtools />
				<Scripts />
			</body>
		</html>
	);
}

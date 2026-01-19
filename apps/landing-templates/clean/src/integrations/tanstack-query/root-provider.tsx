import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function getContext() {
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
	return {
		queryClient,
	};
}

export function Provider({
	children,
	queryClient,
}: {
	children: React.ReactNode;
	queryClient: QueryClient;
}) {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}

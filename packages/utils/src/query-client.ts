import type { DefaultOptions } from "@tanstack/react-query";

export const queryClientDefaultOptions: DefaultOptions = {
  queries: {
    experimental_prefetchInRender: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
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
};
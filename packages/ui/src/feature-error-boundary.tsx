import { useTranslation } from "react-i18next";
import { ApiError } from "@novahair/utils/lib/api-error";
import { ApiErrorFallback } from "./api-error-fallback";
import { ErrorBoundary } from "./error-boundary";

interface FeatureErrorBoundaryProps {
	children: React.ReactNode;
	featureName?: string;
}

/**
 * ErrorBoundary específico para features que muestra errores de API de forma amigable
 */
export function FeatureErrorBoundary({
	children,
	featureName,
}: FeatureErrorBoundaryProps) {
	const { t } = useTranslation();

	return (
		<ErrorBoundary
			fallback={(error, reset) => {
				// Si es un error de API, mostrar el fallback específico
				if (error instanceof ApiError) {
					return <ApiErrorFallback error={error} reset={reset} />;
				}

				// Para otros errores, mostrar fallback genérico
				return (
					<div className="flex min-h-[400px] items-center justify-center p-4">
						<div className="w-full max-w-md space-y-4 text-center">
							<h2 className="text-2xl font-bold">
								{t("error_occurred")}
								{featureName && ` - ${featureName}`}
							</h2>
							<p className="text-muted-foreground">{error.message}</p>
							<button
								type="button"
								onClick={reset}
								className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
							>
								{t("try_again")}
							</button>
						</div>
					</div>
				);
			}}
		>
			{children}
		</ErrorBoundary>
	);
}

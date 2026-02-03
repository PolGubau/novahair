import { ApiErrorFallback } from "@novahair/ui/api-error-fallback";
import { ErrorBoundary } from "@novahair/ui/error-boundary";

export function MainLayout({ children }: { children: React.ReactNode }) {
	return (
 			<main className="grid max-w-7xl w-full mx-auto px-4 pt-4 md:pt-10 min-h-dvh h-dvh">
				<ErrorBoundary
					fallback={(error, reset) => (
						<ApiErrorFallback
							error={error}
							reset={reset}
							showBackButton={false}
						/>
					)}
				>
					{children}
				</ErrorBoundary>
			</main>
 	);
}

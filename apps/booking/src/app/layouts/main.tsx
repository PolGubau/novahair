import { ApiErrorFallback } from "@novahair/ui/api-error-fallback";
import { ErrorBoundary } from "@novahair/ui/error-boundary";

export function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col max-w-7xl w-full mx-auto pt-10">
			<main>
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
		</div>
	);
}

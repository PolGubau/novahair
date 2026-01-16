import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppointmentFormHeader } from "~/features/appointment-form/ui/layout/header";
import { ApiErrorFallback } from "~/shared/ui/api-error-fallback";
import { ErrorBoundary } from "~/shared/ui/error-boundary";

export const Route = createFileRoute("/book")({
	component: BookComponent,
});

function BookComponent() {
	return (
		<div className="flex flex-col max-w-7xl w-full mx-auto">
			<AppointmentFormHeader />
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
					<Outlet />
				</ErrorBoundary>
			</main>
		</div>
	);
}

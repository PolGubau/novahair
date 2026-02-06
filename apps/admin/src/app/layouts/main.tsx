import { ErrorBoundary } from "@novahair/ui/error-boundary";
import { AppSidebar } from "./app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@novahair/ui/sidebar";
import { Breadcrumbs } from "@novahair/ui/breadcrumbs";
import type { PropsWithChildren } from "react";
import { MobileHeader } from "./mobile-header";
import { useBreadcrumbs } from "~/hooks/use-breadcrumbs";
 
export function MainLayout({ children }: PropsWithChildren) {
	const breadcrumbs = useBreadcrumbs();

	return (
		<ErrorBoundary>
			<SidebarProvider>
				<AppSidebar />

				<main className="flex-1 flex flex-col overflow-hidden relative h-screen">
					{/* Mobile Header */}
					<MobileHeader />

					<ErrorBoundary>
						<div className="flex-1 h-full p-4 md:p-6 flex flex-col overflow-hidden gap-2">
 							{breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
							{children}
						</div>
					</ErrorBoundary>
				</main>
			</SidebarProvider>
		</ErrorBoundary>
	);
}

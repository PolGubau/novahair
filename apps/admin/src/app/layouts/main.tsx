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

					{/* Desktop Sidebar Trigger */}
					<div className="hidden md:block absolute bottom-2 left-0 p-1 z-10 border-r border-y rounded-r-full">
						<SidebarTrigger />
					</div>

					<ErrorBoundary>
						<div className="flex-1 overflow-y-auto p-4 md:p-6">
							{/* Breadcrumbs */}
							{breadcrumbs.length > 0 && (
								<div className="mb-2">
									<Breadcrumbs items={breadcrumbs} />
								</div>
							)}
							{children}
						</div>
					</ErrorBoundary>
				</main>
			</SidebarProvider>
		</ErrorBoundary>
	);
}

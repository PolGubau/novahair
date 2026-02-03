import { ErrorBoundary } from "@novahair/ui/error-boundary";
import { AppSidebar } from "./app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@novahair/ui/sidebar";
import type { PropsWithChildren } from "react";
import { MobileHeader } from "./mobile-header";
 
export function MainLayout({ children }: PropsWithChildren) {
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
						<div className="flex-1 overflow-y-auto p-4 md:p-6">{children}</div>
					</ErrorBoundary>
				</main>
			</SidebarProvider>
		</ErrorBoundary>
	);
}

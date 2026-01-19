import { Link } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@novahair/ui/button";
import { ErrorBoundary } from "@novahair/ui/error-boundary";
import { AppSidebar } from "@novahair/ui/layouts/admin/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@novahair/ui/sidebar";

export function MainLayout({ children }: PropsWithChildren) {
	const { t } = useTranslation();

	return (
		<ErrorBoundary>
			<SidebarProvider>
				<AppSidebar />
				<main className="flex-1 min-h-screen overflow-x-hidden">
					<header className="p-2 border-b border-foreground/20 flex items-center gap-2">
						<SidebarTrigger />
						<Link to="/">
							<Button variant="link" className="px-0">
								{t("admin_panel")}
							</Button>
						</Link>
					</header>
					<ErrorBoundary>{children}</ErrorBoundary>
				</main>
			</SidebarProvider>
		</ErrorBoundary>
	);
}

import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppSidebar } from "~/shared/ui/layouts/admin/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "~/shared/ui/sidebar";

export const Route = createFileRoute("/admin")({
	component: BookComponent,
});

function BookComponent() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="w-full min-h-screen">
				<header className="p-2 border-b border-foreground/20">
					<SidebarTrigger />
				</header>
				<Outlet />
			</main>
		</SidebarProvider>
	);
}

import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Button } from "~/shared/ui/button";
import { AppSidebar } from "~/shared/ui/layouts/admin/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "~/shared/ui/sidebar";

export const Route = createFileRoute("/admin")({
	component: BookComponent,
});

function BookComponent() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="flex-1 min-h-screen overflow-x-hidden">
				<header className="p-2 border-b border-foreground/20 flex items-center gap-2">
					<SidebarTrigger />
					<Link to="/admin">
						<Button variant="link" className="px-0">
							Admin Panel
						</Button>
					</Link>
				</header>
				<Outlet />
			</main>
		</SidebarProvider>
	);
}

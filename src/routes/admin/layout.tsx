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
			<main>
				<SidebarTrigger />
				<Outlet />
			</main>
		</SidebarProvider>
	);
}

import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "~/features/admin/ui/page";

export const Route = createFileRoute("/admin/")({
	component: AdminRoute,
});

function AdminRoute() {
	return <AdminPage />;
}

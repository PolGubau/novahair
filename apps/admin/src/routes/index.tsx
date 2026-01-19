import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "~/app/pages/dashboard";

export const Route = createFileRoute("/")({
	component: AdminRoute,
});

function AdminRoute() {
	return <AdminPage />;
}

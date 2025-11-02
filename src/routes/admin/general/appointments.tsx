import { createFileRoute } from "@tanstack/react-router";
import { AdminMain } from "~/shared/ui/layouts/admin/admin-main";

export const Route = createFileRoute("/admin/general/appointments")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<AdminMain title="appointments" description="list_of_appointments">
			test
		</AdminMain>
	);
}

import { createFileRoute } from "@tanstack/react-router";
import { AdminMain } from "~/shared/ui/layouts/admin/admin-main";

export const Route = createFileRoute("/admin/team/members/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<AdminMain
			title="team_members"
			description="manage_your_team_and_schedules"
		>
			test
		</AdminMain>
	);
}

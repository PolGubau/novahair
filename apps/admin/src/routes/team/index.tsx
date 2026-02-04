/**
 * Team Module Index Page
 * 
 * Dashboard for the team module with links to all team-related pages
 */

import { createFileRoute } from "@tanstack/react-router";
import { ModuleDashboard, type ModuleLink } from "~/shared/ui/module-dashboard";
import { Users, Calendar } from "lucide-react";

export const Route = createFileRoute("/team/")({
	component: RouteComponent,
});

const links: ModuleLink[] = [
	{
		title: "team_members",
		description: "manage_team_members_description",
		href: "/team/members",
		icon: Users,
 	},
	{
		title: "schedules",
		description: "manage_schedules_description",
		href: "/team/schedules",
		icon: Calendar,
 	},
];
function RouteComponent() {

	return (
		<ModuleDashboard
			title="team"
			description="manage_your_team_and_schedules"
			links={links}
		/>
	);
}


import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "lucide-react";
import { ModuleDashboard, type ModuleLink } from "~/shared/ui/module-dashboard";

export const Route = createFileRoute("/settings/")({
	component: RouteComponent,
});

function RouteComponent() {
	const links: ModuleLink[] = [
		{
			title: "preferences",
			description: "manage_preferences_description",
			href: "/settings/preferences",
			icon: Settings,
 		},
	 
	];

	return (
		<ModuleDashboard
			title="settings"
			description="manage_application_settings"
			links={links}
		/>
	);
}


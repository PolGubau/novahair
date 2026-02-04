/**
 * Appointments Module Index Page
 * 
 * Dashboard for the appointments module with links to all appointment-related pages
 */

import { createFileRoute } from "@tanstack/react-router";
import { ModuleDashboard, type ModuleLink } from "~/shared/ui/module-dashboard";
import { Calendar, Plus } from "lucide-react";

export const Route = createFileRoute("/appointments/")({
	component: RouteComponent,
});

function RouteComponent() {
	const links: ModuleLink[] = [
		{
			title: "view_appointments",
			description: "view_all_appointments_description",
			href: "/appointments/table",
			icon: Calendar,
 		},
		{
			title: "create_appointment",
			description: "create_new_appointment_description",
			href: "/appointments/create",
			icon: Plus,
 		},
	];

	return (
		<ModuleDashboard
			title="appointments"
			description="manage_appointments_description"
			links={links}
		/>
	);
}


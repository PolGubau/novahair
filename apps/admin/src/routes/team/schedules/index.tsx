import { SchedulesPage } from "~/features/schedules/components/schedules-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/team/schedules/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <SchedulesPage />;
}

import { createFileRoute } from "@tanstack/react-router";
import { FitnessLanding } from "../features/landing/fitness-landing";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <FitnessLanding />;
}


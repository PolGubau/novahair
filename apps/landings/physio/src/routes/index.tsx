import { createFileRoute } from "@tanstack/react-router";
import { PhysioLanding } from "~/features/landing/physio-landing";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return <PhysioLanding />;
}


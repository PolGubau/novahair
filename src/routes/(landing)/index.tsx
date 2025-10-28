import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "~/features/landing/landing-page";

export const Route = createFileRoute("/(landing)/")({
	component: App,
});

function App() {
	return <LandingPage />;
}

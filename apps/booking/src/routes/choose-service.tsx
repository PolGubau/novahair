import { createFileRoute } from "@tanstack/react-router";
import { ServiceSelector } from "~/features/services/ui/selector";

export const Route = createFileRoute("/choose-service")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<section className="flex flex-col gap-4 p-4 ">
			<ServiceSelector />
		</section>
	);
}

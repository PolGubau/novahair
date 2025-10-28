import { createFileRoute } from "@tanstack/react-router";
import { ServiceSelector } from "~/features/appointment-form/ui/service-selector";

export const Route = createFileRoute("/book/choose-service")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<section className="flex flex-col gap-4 p-4 ">
			<ServiceSelector />
		</section>
	);
}

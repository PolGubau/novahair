import { createFileRoute } from "@tanstack/react-router";
import { ServiceSelector } from "@/features/appointment-form/ui/service-selector";

export const Route = createFileRoute("/book/choose-service")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<section className="min-h-screen grid gap-4 p-4 ">
			<ServiceSelector />
		</section>
	)
}

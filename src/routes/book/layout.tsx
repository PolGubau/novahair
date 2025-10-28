import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppointmentFormHeader } from "~/features/appointment-form/ui/layout/header";

export const Route = createFileRoute("/book")({
	component: BookComponent,
});

function BookComponent() {
	return (
		<div className="flex flex-col max-w-7xl w-full mx-auto">
			<AppointmentFormHeader />
			<main>
				<Outlet />
			</main>
		</div>
	);
}

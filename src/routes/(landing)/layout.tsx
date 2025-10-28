import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Footer } from "~/shared/ui/footer";

export const Route = createFileRoute("/(landing)")({
	component: BookComponent,
});

function BookComponent() {
	return (
		<div className="min-h-screen flex flex-col justify-between w-full pb-20">
			<Outlet />

			<Footer />
		</div>
	);
}

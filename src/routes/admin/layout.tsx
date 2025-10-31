import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
	component: BookComponent,
});

function BookComponent() {
	return (
		<div className="min-h-screen flex flex-col justify-between w-full pb-20">
			<h1>Admin</h1>
			<Outlet />
		</div>
	);
}

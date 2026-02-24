import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { copy } from "../data/copy";
import { getContext, Provider } from "~/integrations/tanstack-query/root-provider";

const { queryClient } = getContext();

export const Route = createRootRoute({
	component: RootComponent,
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: `${copy.name} - ${copy.tagline}`,
			},
			{
				name: "description",
				content: copy.description,
			},
			{
				name: "keywords",
				content:
					"gimnasio, fitness, entrenamiento personal, clases grupales, HIIT, spinning, yoga, crossfit, musculación, cardio, madrid",
			},
		],
	}),
});

function RootComponent() {
	return (
		<Provider queryClient={queryClient}>
			<Outlet />
			{import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />}
		</Provider>
	);
}


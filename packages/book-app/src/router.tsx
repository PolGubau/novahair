import { createRouter } from "@tanstack/react-router";
import * as TanstackQuery from "./integrations/tanstack-query/root-provider";
import "./shared/i18n/setup";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
export const getRouter = () => {
	const rqContext = TanstackQuery.getContext();

	const router = createRouter({
		routeTree,
		scrollRestoration: true,
		defaultViewTransition: true,
		context: { ...rqContext },
		defaultPreload: "intent",
 	});

	return router;
};

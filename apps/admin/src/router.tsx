import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import * as TanstackQuery from "./integrations/tanstack-query/root-provider";
import "@novahair/utils/i18n/setup";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
export const getRouter = () => {
	const rqContext = TanstackQuery.getContext();

	const router = createRouter({
		context: { ...rqContext },
		defaultPreload: "intent",

		defaultViewTransition: true,
		routeTree,
		scrollRestoration: true,
		// Wrap removed since providers are now in RootDocument
	});

	setupRouterSsrQueryIntegration({
		queryClient: rqContext.queryClient,
		router,
	});

	return router;
};

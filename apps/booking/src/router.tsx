import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import {getContext} from "./integrations/tanstack-query/root-provider";
import "./shared/i18n/setup";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
export const getRouter = () => {
	const rqContext = getContext();

	const router = createRouter({
		routeTree,
		scrollRestoration: true,
		defaultViewTransition: true,
		context: { ...rqContext },
		defaultPreload: "intent",
 	});

	setupRouterSsrQueryIntegration({
		router,
		queryClient: rqContext.queryClient,
	});

	return router;
};

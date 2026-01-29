import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryClientDefaultOptions } from "@novahair/utils";

export function getContext() {
	const queryClient = new QueryClient({
		defaultOptions: queryClientDefaultOptions as any
	});
	return {
		queryClient,
	};
}

export function Provider({
	children,
	queryClient,
}: {
	children: React.ReactNode;
	queryClient: QueryClient;
}) {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}

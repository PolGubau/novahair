import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useMemo, type ReactNode } from "react";
import { queryClientDefaultOptions } from "../query-client";

// Import i18n setup to ensure it's initialized
import "../i18n/setup";
import i18n from "../i18n/setup";

interface RootProviderProps {
  children: ReactNode;
  onChangedLanguage?: (language: string) => void;
}

export function RootProvider({ children, onChangedLanguage }: RootProviderProps) {
	const queryClient = useMemo(
		() => new QueryClient({ defaultOptions: queryClientDefaultOptions }),
		[]
  );

 	useEffect(() => {
		const handler = () => onChangedLanguage?.(i18n.language);
		i18n.on("languageChanged", handler);
		return () => i18n.off("languageChanged", handler);
	}, [i18n, onChangedLanguage]);

	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
}
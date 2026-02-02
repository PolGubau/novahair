/**
 * Admin Dashboard Page
 *
 * Main dashboard page that displays comprehensive business metrics
 * using the new dashboard feature with Clean Architecture
 */

import { ErrorBoundary } from "@novahair/ui";
import { DashboardView } from "~/features/dashboard";

export const AdminPage = () => {
	return (
		<ErrorBoundary>
			<DashboardView />
		</ErrorBoundary>
	);
};

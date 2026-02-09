import { type Service, useServiceActions, useServices } from "@novahair/client";
import { Drawer, QuickActions } from "@novahair/ui";
import { FeatureErrorBoundary } from "@novahair/ui/feature-error-boundary";
import { config } from "@novahair/utils";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AdminMain } from "~/app/layouts/admin-main";
import { ServiceCreationForm } from "~/features/services/ui/form";
import { ServiceTable } from "~/features/services/ui/table";
export const Route = createFileRoute("/services/table")({
	component: RouteComponent,
});

function RouteComponent() {
	const { t } = useTranslation();
	const { services, isLoading, refetch } = useServices(config.tenantId);
	const { remove } = useServiceActions(config.tenantId);

	const [isFormOpened, setIsFormOpened] = useState(false);
	const [editing, setEditing] = useState<Service | null>(null);

	const openCreate = () => {
		setEditing(null);
		setIsFormOpened(true);
	}

	const openEdit = (s: Service) => {
		setEditing(s);
		setIsFormOpened(true);
	}

	const handleDelete = (s: Service) => {
		remove.mutate(s.id);
	}

	return (
		<FeatureErrorBoundary featureName="services">
			<AdminMain description={"manage_your_services"} title={"services"} rightContent={
				<QuickActions
									actions={[{
										 id: "add_new_service",
										 label: t("add_new_service"),
										 icon: <Plus  />,
											onClick: openCreate,
									 },
										{
											id: "refresh",
											label: t("refresh"),
											icon: <RefreshCcw  />,
											onClick: refetch,
										}
								 ]}
								/>
			}>
				<Drawer
					description="fill_the_form_to_add_a_new_service"
					onOpenChange={setIsFormOpened}
					open={isFormOpened}
					title="add_new_service"
				>
					<ServiceCreationForm
						onClose={() => {
							setIsFormOpened(false);
							setEditing(null)
						}}
						service={editing}
					/>
				</Drawer>
			 
				<ServiceTable
					isLoading={isLoading}
					onDelete={handleDelete}
					onEdit={openEdit}
					services={services}
				/>
			</AdminMain>
		</FeatureErrorBoundary>
	)
}

import { type Service, useServiceActions, useServices } from "@novahair/client";
import { Button } from "@novahair/ui/button";
import { Drawer } from "@novahair/ui/drawer";
import { FeatureErrorBoundary } from "@novahair/ui/feature-error-boundary";
import { AdminMain } from "~/app/layouts/admin-main";
import { config } from "@novahair/utils";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
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
			<AdminMain description={"manage_your_services"} title={"services"}>
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
				<nav className="flex gap-2 items-center">
					<Button onClick={openCreate}>
						<Plus />
						{t("add_new_service")}
					</Button>

					<Button className="group" onClick={() => refetch()} variant="ghost">
						<div className="group-focus:rotate-90 transition-all">
							<RefreshCcw />
						</div>

						{t("refresh_services")}
					</Button>
				</nav>
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

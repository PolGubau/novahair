import { type Service, useServiceActions, useServices } from "@novahair/client";
import { Button } from "@novahair/ui/button";
import { Drawer } from "@novahair/ui/drawer";
import { FeatureErrorBoundary } from "@novahair/ui/feature-error-boundary";
import { AdminMain } from "@novahair/ui/layouts/admin/admin-main";
import { config } from "@novahair/utils";
import { createFileRoute } from "@tanstack/react-router";
import { t } from "i18next";
import { Plus, RefreshCcw } from "lucide-react";
import { useState } from "react";
 import { ServiceCreationForm } from "~/features/services/ui/form";
import { ServiceTable } from "~/features/services/ui/table";

export const Route = createFileRoute("/services/")({
	component: RouteComponent,
});

function RouteComponent() {
 	const { services, isLoading, refetch } = useServices(config.tenantId);
	const { remove } = useServiceActions(config.tenantId);

	const [isFormOpened, setIsFormOpened] = useState(false);
	const [editing, setEditing] = useState<Service | null>(null);

	const openCreate = () => {
		setEditing(null);
		setIsFormOpened(true);
	};

	const openEdit = (s: Service) => {
		setEditing(s);
		setIsFormOpened(true);
	};

	const handleDelete = (s: Service) => {
		remove.mutate(s.id);
	};

	return (
		<FeatureErrorBoundary featureName="Services">
			<AdminMain title={"services"} description={"manage_your_services"}>
				<Drawer
					open={isFormOpened}
					onOpenChange={setIsFormOpened}
					title="add_new_service"
					description="fill_the_form_to_add_a_new_service"
				>
					<ServiceCreationForm
						service={editing}
						onClose={() => {
							setIsFormOpened(false);
							setEditing(null);
						}}
					/>
				</Drawer>
				<nav className="flex gap-2 items-center">
					<Button onClick={openCreate}>
						<Plus />
						{t("add_new_service")}
					</Button>

					<Button onClick={() => refetch()} variant="ghost" className="group">
						<div className="group-focus:rotate-90 transition-all">
							<RefreshCcw />
						</div>

						{t("refresh_services")}
					</Button>
				</nav>
				<ServiceTable
					services={services}
					isLoading={isLoading}
					onEdit={openEdit}
					onDelete={handleDelete}
				/>
			</AdminMain>
		</FeatureErrorBoundary>
	);
}

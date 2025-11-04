import { createFileRoute } from "@tanstack/react-router";
import { t } from "i18next";
import { Plus, RefreshCcw } from "lucide-react";
import { useState } from "react";
import type { Service } from "~/features/services/domain/service";
import { useService } from "~/features/services/model/use-service";
import { useServices } from "~/features/services/model/use-services";
import { ServiceCreationForm } from "~/features/services/ui/creation-form";
import { ServiceTable } from "~/features/services/ui/table/service-table";
import { Button } from "~/shared/ui/button";
import { Drawer } from "~/shared/ui/drawer";
import { AdminMain } from "~/shared/ui/layouts/admin/admin-main";

export const Route = createFileRoute("/admin/services/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { services, isLoading, refetch } = useServices();
	const { remove } = useService();

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
		<AdminMain title={"services"} description={"manage_your_services"}>
			<Drawer open={isFormOpened} onOpenChange={setIsFormOpened}>
				<ServiceCreationForm
					service={editing}
					onClose={() => {
						setIsFormOpened(false);
						setEditing(null)
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
	)
}

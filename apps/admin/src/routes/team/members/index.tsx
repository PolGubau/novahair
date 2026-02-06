import { type Staff, useStaffActions, useStaffs } from "@novahair/client";
import { QuickActions } from "@novahair/ui";
import { Button } from "@novahair/ui/button";
import { Drawer } from "@novahair/ui/drawer";
import { FeatureErrorBoundary } from "@novahair/ui/feature-error-boundary";
 import { config } from "@novahair/utils";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AdminMain } from "~/app/layouts/admin-main";
import { StaffForm } from "~/features/staff/ui/form";
import { StaffTable } from "~/features/staff/ui/table";

export const Route = createFileRoute("/team/members/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { t } = useTranslation();
	const { staffs, isLoading, refetch } = useStaffs(config.tenantId);
	const { remove } = useStaffActions();

	const [isFormOpened, setIsFormOpened] = useState(false);
	const [editingStaff, setEditingStaff] = useState<Staff | null>(null);

	const openCreate = () => {
		setEditingStaff(null);
		setIsFormOpened(true);
	};

	const openEdit = (s: Staff) => {
		setEditingStaff(s);
		setIsFormOpened(true);
	};

	const handleDelete = (s: Staff) => {
		remove.mutate(s.id);
	};

	return (
		<FeatureErrorBoundary featureName="team">
			<AdminMain
				description="manage_your_team_and_schedules"
				title="team_members"
				rightContent={
								<QuickActions
													actions={[
														{
															id: "add_new_staff",
															label: t("add_new_staff"),
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
					description="fill_the_form_to_add_a_new_staff_member"
					onOpenChange={setIsFormOpened}
					open={isFormOpened}
					title="add_new_staff"
					
				>
					<StaffForm
						onClose={() => {
							setIsFormOpened(false);
							setEditingStaff(null);
						}}
						staff={editingStaff}
					/>
				</Drawer>
			
				<StaffTable
					isLoading={isLoading}
					onDelete={handleDelete}
					onEdit={openEdit}
					staffs={staffs}
				/>
			</AdminMain>
		</FeatureErrorBoundary>
	);
}

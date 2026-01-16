import { createFileRoute } from "@tanstack/react-router";
import { t } from "i18next";
import { Plus, RefreshCcw } from "lucide-react";
import { useState } from "react";
import type { Staff } from "~/features/staff/domain/staff";
import { useStaff } from "~/features/staff/models/use-staff";
import { useStaffs } from "~/features/staff/models/use-staffs";
import { StaffForm } from "~/features/staff/ui/form";
import { StaffTable } from "~/features/staff/ui/table";
import { Button } from "~/shared/ui/button";
import { Drawer } from "~/shared/ui/drawer";
import { AdminMain } from "~/shared/ui/layouts/admin/admin-main";

export const Route = createFileRoute("/admin/team/members/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { staffs, isLoading, refetch } = useStaffs();
	const { remove } = useStaff();

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
		<AdminMain
			title="team_members"
			description="manage_your_team_and_schedules"
		>
			<Drawer
				open={isFormOpened}
				onOpenChange={setIsFormOpened}
				title="add_new_staff"
				description="fill_the_form_to_add_a_new_staff_member"
			>
				<StaffForm
					staff={editingStaff}
					onClose={() => {
						setIsFormOpened(false);
						setEditingStaff(null);
					}}
				/>
			</Drawer>
			<nav className="flex gap-2 items-center">
				<Button onClick={openCreate}>
					<Plus />
					{t("add_new_staff")}
				</Button>

				<Button onClick={() => refetch()} variant="ghost" className="group">
					<div className="group-focus:rotate-90 transition-all">
						<RefreshCcw />
					</div>

					{t("refresh")}
				</Button>
			</nav>
			<StaffTable
				staffs={staffs}
				isLoading={isLoading}
				onEdit={openEdit}
				onDelete={handleDelete}
			/>
		</AdminMain>
	);
}

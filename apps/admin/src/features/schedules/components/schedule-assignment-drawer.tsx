import { Button } from "@novahair/ui";
import { Drawer } from "@novahair/ui/drawer";
import { t } from "i18next";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AddScheduleForm } from "./add-schedule-form/add-schedule-form";

interface ScheduleAssignmentDrawerProps {
	selectedDays: Date[];
	setSelectedDays: (dates: Date[]) => void;
}

export function ScheduleAssignmentDrawer({
	selectedDays,
	setSelectedDays,
}: ScheduleAssignmentDrawerProps) {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	return (
		<>
			<Button
				onClick={() => setIsDrawerOpen(true)}
				disabled={!selectedDays.length}
			>
				<Plus className="size-4" />
				<span className="max-md:hidden">{t("add_schedules")}</span>
			</Button>
			<Drawer
				open={isDrawerOpen}
				onOpenChange={setIsDrawerOpen}
				title={"schedules"}
				description={"manage_your_team_schedules"}
			>
				<AddScheduleForm
					onCancel={() => setIsDrawerOpen(false)}
					onSuccess={() => setIsDrawerOpen(false)}
					selectedDays={selectedDays}
					setSelectedDays={setSelectedDays}
				/>
			</Drawer>
		</>
	);
}

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
				disabled={!selectedDays.length}
				onClick={() => setIsDrawerOpen(true)}
			>
				<Plus className="size-4" />
				<span className="max-md:hidden">{t("add_schedules")}</span>
			</Button>
			<Drawer
				description={"manage_your_team_schedules"}
				onOpenChange={setIsDrawerOpen}
				open={isDrawerOpen}
				title={"schedules"}
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

import { Drawer } from "@novahair/ui/drawer";
import { useTranslation } from "react-i18next";
import { AddScheduleForm } from "./add-schedule-form/add-schedule-form";

interface ScheduleAssignmentDrawerProps {
	selectedDays: Date[];
	setSelectedDays: (dates: Date[]) => void;
	open: boolean;
	setOpen: (open: boolean) => void;
}

export function ScheduleAssignmentDrawer({
	selectedDays,
	setSelectedDays,
	open: isDrawerOpen,
	setOpen: setIsDrawerOpen,
}: ScheduleAssignmentDrawerProps) {
	const { t } = useTranslation();
 
	return (
		<>
		 
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

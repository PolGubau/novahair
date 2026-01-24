import { Button, Checkbox } from "@novahair/ui";
import { Drawer } from "@novahair/ui/drawer";
import { Input } from "@novahair/ui/input";
import { Plus, X } from "lucide-react";

type TimeSlot = {
	start: string;
	end: string;
};

interface ScheduleAssignmentDrawerProps {
	isDrawerOpen: boolean;
	setIsDrawerOpen: (open: boolean) => void;
	staffs: { id: string; name: string }[] | undefined;
	drawerStaff: string[];
	setDrawerStaff: (staff: string[]) => void;
	drawerTimeSlots: TimeSlot[];
	setDrawerTimeSlots: (slots: TimeSlot[]) => void;
	handleAssign: () => void;
	isAssigning: boolean;
}

export function ScheduleAssignmentDrawer({
	isDrawerOpen,
	setIsDrawerOpen,
	staffs,
	drawerStaff,
	setDrawerStaff,
	drawerTimeSlots,
	setDrawerTimeSlots,
	handleAssign,
	isAssigning,
}: ScheduleAssignmentDrawerProps) {
	const addTimeSlot = () => {
		setDrawerTimeSlots([...drawerTimeSlots, { start: "", end: "" }]);
	};

	const removeTimeSlot = (index: number) => {
		setDrawerTimeSlots(drawerTimeSlots.filter((_, i) => i !== index));
	};

	const updateTimeSlot = (
		index: number,
		field: "start" | "end",
		value: string,
	) => {
		setDrawerTimeSlots(
			drawerTimeSlots.map((slot, i) =>
				i === index ? { ...slot, [field]: value } : slot,
			),
		);
	};

	return (
		<Drawer
			open={isDrawerOpen}
			onOpenChange={setIsDrawerOpen}
			title={"schedules"}
			description={"manage_your_team_schedules"}
		>
			<div className="space-y-6">
				<div>
					<h3 className="text-lg font-semibold mb-2">Seleccionar Empleados</h3>
					<div className="space-y-2">
						{staffs?.map((staff) => (
							<div key={staff.id} className="flex items-center space-x-2">
								<Checkbox
									id={staff.id}
									checked={drawerStaff.includes(staff.id)}
									onCheckedChange={(checked) => {
										if (checked) {
											setDrawerStaff([...drawerStaff, staff.id]);
										} else {
											setDrawerStaff(
												drawerStaff.filter((id) => id !== staff.id),
											);
										}
									}}
								/>
								<label htmlFor={staff.id}>{staff.name}</label>
							</div>
						))}
					</div>
				</div>

				<div>
					<h3 className="text-lg font-semibold mb-2">Horarios</h3>
					<div className="space-y-2">
						{drawerTimeSlots.map((slot, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: key
							<div key={index} className="flex items-center space-x-2">
								<Input
									type="time"
									value={slot.start}
									onChange={(e) =>
										updateTimeSlot(index, "start", e.target.value)
									}
									placeholder="Inicio"
								/>
								<span>a</span>
								<Input
									type="time"
									value={slot.end}
									onChange={(e) => updateTimeSlot(index, "end", e.target.value)}
									placeholder="Fin"
								/>
								{drawerTimeSlots.length > 1 && (
									<Button
										variant="outline"
										size="sm"
										onClick={() => removeTimeSlot(index)}
									>
										<X className="h-4 w-4" />
									</Button>
								)}
							</div>
						))}
						<Button variant="outline" onClick={addTimeSlot}>
							<Plus className="h-4 w-4 mr-2" />
							Agregar Horario
						</Button>
					</div>
				</div>

				<Button
					onClick={handleAssign}
					disabled={
						isAssigning ||
						!drawerStaff.length ||
						!drawerTimeSlots.some((s) => s.start && s.end)
					}
				>
					{isAssigning ? "Asignando..." : "Asignar"}
				</Button>
			</div>
		</Drawer>
	);
}

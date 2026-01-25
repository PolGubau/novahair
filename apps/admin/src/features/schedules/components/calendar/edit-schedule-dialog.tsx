import { useStaffs } from "@novahair/client";
import { Button } from "@novahair/ui";
import { Input } from "@novahair/ui/input";
import { Label } from "@novahair/ui/label";
import { Select } from "@novahair/ui/select";
import { type TranslationKey, config } from "@novahair/utils";
import { useState } from "react";
import type { Schedule } from "./weekly-calendar";

type EditScheduleProps = {
	schedule: Schedule | null;
	onSave: (updatedSchedule: Schedule) => void;
	onClose: () => void;
};

export function EditSchedule({ schedule, onSave, onClose }: EditScheduleProps) {
	const { staffs } = useStaffs(config.tenantId);
	const [editedSchedule, setEditedSchedule] = useState<Schedule | null>(
		schedule,
	);

	if (!schedule || !editedSchedule) return null;

	const handleSave = () => {
		if (editedSchedule) {
			onSave(editedSchedule);
		}
		onClose();
	};

	return (
		<div className="">
			<h2 className="text-lg font-semibold mb-4">Editar Horario</h2>
			<div className="space-y-4">
				<div className="grid grid-cols-[1fr_3fr] gap-4 items-center">
					<Label label="Trabajador" />
					<Select
						value={editedSchedule.staff}
						onChange={(value) =>
							setEditedSchedule({ ...editedSchedule, staff: value })
						}
						options={staffs.map((staff) => ({
							value: staff.name,
							label: staff.name as TranslationKey,
						}))}
						placeholder="select"
					/>
				</div>
				<div className="grid grid-cols-[1fr_3fr] gap-4 items-center">
					<Label label="Hora Inicio" />
					<Input
						id="start"
						type="time"
						value={editedSchedule.start}
						onChange={(e) =>
							setEditedSchedule({
								...editedSchedule,
								start: e.target.value,
							})
						}
					/>
				</div>
				<div className="grid grid-cols-[1fr_3fr] gap-4 items-center">
					<Label label="Hora Fin" />
					<Input
						id="end"
						type="time"
						value={editedSchedule.end}
						onChange={(e) =>
							setEditedSchedule({ ...editedSchedule, end: e.target.value })
						}
					/>
				</div>
			</div>
			<div className="flex justify-end gap-2 mt-6">
				<Button variant="outline" onClick={onClose}>
					Cancelar
				</Button>
				<Button onClick={handleSave}>Guardar</Button>
			</div>
		</div>
	);
}

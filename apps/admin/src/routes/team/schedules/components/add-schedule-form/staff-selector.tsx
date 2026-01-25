import { type Staff, useStaffs } from "@novahair/client";
import { Checkbox, CheckboxChip } from "@novahair/ui";
import { config } from "@novahair/utils";

type Props = {
	selectedStaffs: Staff[];
	onChange: (staffs: Staff[]) => void;
};

export function StaffSelector({ selectedStaffs, onChange }: Props) {
	const { staffs } = useStaffs(config.tenantId);

	const toggleStaff = (staff: Staff) => {
		if (selectedStaffs.some((s) => s.id === staff.id)) {
			onChange(selectedStaffs.filter((s) => s.id !== staff.id));
		} else {
			onChange([...selectedStaffs, staff]);
		}
	};

	return (
		<div>
			<h3 className="text-lg font-semibold mb-2">Seleccionar Empleados</h3>
			<ul className="gap-2 grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
				{staffs?.map((staff) => (
					<li key={staff.id} className="flex items-center space-x-2">
						<CheckboxChip
							label={staff.name}
							name={staff.id}
							value={staff.name}
							id={staff.id}
							checked={selectedStaffs.some((s) => s.id === staff.id)}
							onCheckedChange={() => toggleStaff(staff)}
						/>
 					</li>
				))}
			</ul>
		</div>
	);
}

import { type Staff, useStaffs } from "@novahair/client";
import { CheckboxChip } from "@novahair/ui";
import { config, type TranslationKey } from "@novahair/utils";
import { t } from "i18next";

type Props = {
	label?: TranslationKey;
	selectedStaffs: Staff[];
	onChange: (staffs: Staff[]) => void;
};

export function StaffSelector({
	selectedStaffs,
	onChange,
	label = "select_staff",
}: Props) {
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
			<h3 className="text-lg font-semibold mb-2">{t(label)}</h3>
			<ul className="gap-2 grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
				{staffs?.map((staff) => (
					<li className="flex items-center space-x-2" key={staff.id}>
						<CheckboxChip
							checked={selectedStaffs.some((s) => s.id === staff.id)}
							id={staff.id}
							label={staff.name}
							name={staff.id}
							onCheckedChange={() => toggleStaff(staff)}
							value={staff.name}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}

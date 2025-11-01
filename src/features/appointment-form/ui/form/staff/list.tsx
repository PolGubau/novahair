import Avatar from "boring-avatars";
import { t } from "i18next";
import type { Staff } from "~/features/appointment-form/domain/slot";
import { Button } from "~/shared/ui/button";

type Props = {
	staffs: Staff[];
	selectedStaffId?: string;
	onSelectStaff?: (staffId: string) => void;
};
export const StaffSelector = ({
	staffs,
	selectedStaffId,
	onSelectStaff,
}: Props) => {
	return (
		<div className="flex flex-col gap-2">
			<h3>Select Staff</h3>
			<ul className="flex flex-wrap ">
				{staffs.map((staff) => {
					const isSelected = selectedStaffId === staff.id;
					function handleSelect() {
						onSelectStaff?.(staff.id);
					}

					return (
						<li key={staff.id} className="flex items-center gap-2">
							<Button
								type="button"
								variant={isSelected ? "default" : "outline"}
								onClick={handleSelect}
							>
								<Avatar
									size={24}
									name={staff.name ?? "Unknown"}
									variant="beam"
								/>
								<span>{staff.name ?? t("unknown")}</span>
							</Button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

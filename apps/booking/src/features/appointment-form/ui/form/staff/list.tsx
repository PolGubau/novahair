import type { Staff } from "@novahair/client";
import { Button } from "@novahair/ui/button";
import { labelClasses } from "@novahair/ui/label";
import Avatar from "boring-avatars";
import { t } from "i18next";
import { ArrowUp } from "lucide-react";

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
		<div className="flex flex-col gap-1 min-h-16">
			<h3 className={labelClasses.base}>{t("select_staff")}</h3>
			<ul className="flex flex-wrap">
				{!staffs.length ? (
					<div className="flex gap-2 items-center">
						<p>{t("select_first_time_slot")}</p>
						<ArrowUp className="text-foreground/50 size-5" />
					</div>
				) : (
					staffs.map((staff) => {
						const isSelected = selectedStaffId === staff.id;
						function handleSelect() {
							onSelectStaff?.(staff.id);
						}

						return (
							<li key={staff.id} className="flex items-center gap-2">
								<Button
									type="button"
									variant={isSelected ? "secondary" : "outline"}
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
					})
				)}
			</ul>
		</div>
	);
};

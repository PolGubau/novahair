import { useStaffs } from "@novahair/client";
import { Avatar, Button, Label } from "@novahair/ui";
import { t } from "i18next";
import { ChevronLeft } from "lucide-react";
import { useTenantId } from "../../../shared/tenant";

type Props = {
	serviceId: string;
	onStaffSelect?: (staffId: string) => void;
	onBack?: () => void;
};

export const StaffSelector = ({ serviceId, onStaffSelect, onBack }: Props) => {
	const tenantId = useTenantId();
	const { staffs, isLoading } = useStaffs(tenantId);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-2">
				{onBack && (
					<Button variant="ghost" size="sm" onClick={onBack}>
						<ChevronLeft />
					</Button>
				)}
 				<Label label={t("select_staff")} />
			</div>
			<ul className="flex flex-wrap gap-2">
				{staffs.map((staff) => (
					<li key={staff.id}>
						<Button
							type="button"
							variant="outline"
							className="pl-2"
							onClick={() => onStaffSelect?.(staff.id)}
						>
							<Avatar
								alt={staff.name ?? "Unknown"}
								size="sm"
								src={staff.avatarUrl ?? ""}
							/>
							<span>{staff.name ?? t("unknown")}</span>
						</Button>
					</li>
				))}
			</ul>
		</div>
	);
};
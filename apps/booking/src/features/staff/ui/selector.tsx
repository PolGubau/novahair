import { useStaffs } from "@novahair/client";
import { Avatar, Button } from "@novahair/ui";
import { labelClasses } from "@novahair/ui/label";
import { t } from "i18next";
import { useNavigate } from "@tanstack/react-router";
import { useTenantId } from "~/shared/tenant";

type Props = {
	serviceId: string;
};

export const StaffSelector = ({ serviceId }: Props) => {
	const tenantId = useTenantId();
	const { staffs, isLoading } = useStaffs(tenantId);
	const navigate = useNavigate();

	const handleSelectStaff = (staffId: string) => {
		navigate({
			to: "/calendar",
			search: { staffId, serviceId},
		});
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex flex-col gap-4">
			<h2 className={labelClasses.base}>{t("select_staff")}</h2>
			<ul className="flex flex-wrap gap-2">
				{staffs.map((staff) => (
					<li key={staff.id}>
						<Button
							type="button"
							variant="outline"
							onClick={() => handleSelectStaff(staff.id)}
							className="pl-2"
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
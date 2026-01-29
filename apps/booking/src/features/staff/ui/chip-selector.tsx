import { useStaffs } from "@novahair/client";
import { Avatar, Button } from "@novahair/ui";
import { labelClasses } from "@novahair/ui/label";
import { Link } from "@tanstack/react-router";
import { t } from "i18next";
import { useTenantId } from "~/shared/tenant";

type Props = {
	serviceId: string;
};

export const StaffChipSelector = ({ serviceId }: Props) => {
	const tenantId = useTenantId();
	const { staffs, isLoading } = useStaffs(tenantId);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex flex-col gap-4">
			<h2 className={labelClasses.base}>{t("select_staff")}</h2>
			<ul className="flex flex-wrap gap-2">
				{staffs.map((staff) => (
					<li key={staff.id}>
						<Link to="/calendar" search={{ staffId: staff.id, serviceId }}>
						<Button
							type="button"
							variant="outline"
							className="pl-2"
							>
							<Avatar
								alt={staff.name ?? "Unknown"}
								size="sm"
								src={staff.avatarUrl ?? ""}
								/>
							<span>{staff.name ?? t("unknown")}</span>
						</Button>
								</Link>
					</li>
				))}
			</ul>
		</div>
	);
};
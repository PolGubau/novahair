import { useServices, useStaffAssignmentActions } from "@novahair/client";
import { Button } from "@novahair/ui/button";
import { CheckboxChip } from "@novahair/ui/checkbox/chip";
import { Popover } from "@novahair/ui/popover";
import { config } from "@novahair/utils";
import { useQueryClient } from "@tanstack/react-query";
import { t } from "i18next";
import { Edit2 } from "lucide-react";
import { useState } from "react";

type ServicesAssignedCellProps = {
	assignedServiceIds: string[];
	staffId: string;
};
export const ServicesAssignedCell = ({
	assignedServiceIds = [],
	staffId,
}: ServicesAssignedCellProps) => {
	const qc = useQueryClient();
	const { services } = useServices(config.tenantId);
	const { assign } = useStaffAssignmentActions(config.tenantId, staffId);

	function handleAssignServices() {
		assign.mutate(
			{ serviceIds: updatedAssigned },
			{
				onSuccess: () => {
					qc.invalidateQueries({
						queryKey: ["staffs", config.tenantId],
					});
					setOpen(false);
				},
			},
		);
	}

	const [updatedAssigned, setUpdatedAssigned] =
		useState<string[]>(assignedServiceIds);

	const hasChanged =
		JSON.stringify(assignedServiceIds) !== JSON.stringify(updatedAssigned);

	const [open, setOpen] = useState(false);
	return (
		<Popover
			open={open}
			onOpenChange={setOpen}
			trigger={
				<Button className="flex gap-2 items-center" variant="ghost">
					<Edit2 />
					{t("x_services_assigned", { count: assignedServiceIds.length })}
				</Button>
			}
		>
			<div className="flex flex-col gap-2">
				<p className="font-medium">{t("assigned_services")}</p>
				<ul className="flex flex-wrap gap-1">
					{services.map((service) => {
						const isAssigned = updatedAssigned.includes(service.id);
						const toggleAssignment = () => {
							if (isAssigned) {
								setUpdatedAssigned(
									updatedAssigned.filter((id) => id !== service.id),
								);
							} else {
								setUpdatedAssigned([...updatedAssigned, service.id]);
							}
						};

						return (
							<li key={service.id}>
								<CheckboxChip
									label={service.name}
									value={service.id}
									checked={isAssigned}
									onCheckedChange={toggleAssignment}
								/>
							</li>
						);
					})}
				</ul>
			</div>

			{hasChanged && (
				<div className="mt-4 flex justify-end">
					<Button size="sm" variant="primary" onClick={handleAssignServices}>
						Save Changes
					</Button>
				</div>
			)}
		</Popover>
	);
};

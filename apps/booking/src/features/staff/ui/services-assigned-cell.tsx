import { Edit2 } from "lucide-react";
import { useState } from "react";
import { useServices } from "~/features/services/hooks/use-services";
import { Button } from "@novahair/ui/button";
import { CheckboxChip } from "@novahair/ui/checkbox/chip";
import { Popover } from "@novahair/ui/popover";

type ServicesAssignedCellProps = {
	assignedServiceIds: string[];
};
export const ServicesAssignedCell = ({
	assignedServiceIds = [],
}: ServicesAssignedCellProps) => {
	const { services } = useServices();
	const [updatedAssigned, setUpdatedAssigned] =
		useState<string[]>(assignedServiceIds);

	const hasChanged =
		JSON.stringify(assignedServiceIds) !== JSON.stringify(updatedAssigned);

	return (
		<Popover
			trigger={
				<Button className="flex gap-2 items-center" variant="ghost">
					<Edit2 />
					<p>{assignedServiceIds.length} services assigned</p>
				</Button>
			}
		>
			<div className="flex flex-col gap-2">
				<p className="font-medium">Assigned Services</p>

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
					<Button size="sm" variant="primary">
						Save Changes
					</Button>
				</div>
			)}
		</Popover>
	);
};

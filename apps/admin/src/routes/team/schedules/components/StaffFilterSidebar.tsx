import { Checkbox } from "@novahair/ui";
import { Loader } from "@novahair/ui/loader";

interface StaffFilterSidebarProps {
	staffs: { id: string; name: string }[] | undefined;
	filteredStaffs: string[];
	setFilteredStaffs: (staffs: string[]) => void;
	isLoading: boolean;
}

export function StaffFilterSidebar({
	staffs,
	filteredStaffs,
	setFilteredStaffs,
	isLoading,
}: StaffFilterSidebarProps) {
	if (isLoading) {
		return (
			<div className="w-64 p-4 border-r">
				<Loader />
			</div>
		);
	}

	return (
		<div className="w-64 p-4 border-r">
			<h3 className="text-lg font-semibold mb-2">Filtrar Trabajadores</h3>
			<div className="space-y-2">
				{staffs?.map((staff) => (
					<div key={staff.id} className="flex items-center space-x-2">
						<Checkbox
							id={`filter-${staff.id}`}
							checked={filteredStaffs.includes(staff.id)}
							onCheckedChange={(checked) => {
								if (checked) {
									setFilteredStaffs([...filteredStaffs, staff.id]);
								} else {
									setFilteredStaffs(
										filteredStaffs.filter((id) => id !== staff.id),
									);
								}
							}}
						/>
						<label htmlFor={`filter-${staff.id}`}>{staff.name}</label>
					</div>
				))}
			</div>
		</div>
	);
}

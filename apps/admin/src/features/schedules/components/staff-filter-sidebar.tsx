import type { Staff } from "@novahair/client";
import { Loader } from "@novahair/ui/loader";
import { StaffSelector } from "./add-schedule-form/staff-selector";

interface StaffFilterProps {
	filteredStaffs: Staff[];
	setFilteredStaffs: (staffs: Staff[]) => void;
	isLoading: boolean;
}

export function StaffFilter({
	filteredStaffs,
	setFilteredStaffs,
	isLoading,
}: StaffFilterProps) {
	if (isLoading) {
		return (
			<div className="w-64 p-4 border-r">
				<Loader />
			</div>
		);
	}

	return (
		<section className="">
			<StaffSelector
				onChange={setFilteredStaffs}
				selectedStaffs={filteredStaffs}
			/>
		</section>
	);
}

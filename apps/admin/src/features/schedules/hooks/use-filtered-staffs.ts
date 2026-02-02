import type { Staff } from "@novahair/client";
import { useEffect, useMemo, useState } from "react";

export function useFilteredStaffs(staffs?: Staff[]) {
	const [filteredStaffs, setFilteredStaffs] = useState<Staff[]>([]);

	useEffect(() => {
		if (staffs) {
			setFilteredStaffs(staffs);
		}
	}, [staffs]);

	const filteredStaffIds = useMemo(
		() => filteredStaffs.map((staff) => staff.id),
		[filteredStaffs],
	);

	return { filteredStaffs, setFilteredStaffs, filteredStaffIds };
}

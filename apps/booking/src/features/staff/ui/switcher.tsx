import { useStaffs } from "@novahair/client";
import { Avatar } from "@novahair/ui";
import { Select } from "@novahair/ui/select";
import type { TranslationKey } from "@novahair/utils/i18n/types";

import { useTenantId } from "~/shared/tenant";

type Props = {
	staffId?: string;
	onSelect: (staffId: string) => void;
}
export const StaffSwitcher = ({ staffId, onSelect }: Props) => {
	const  tenantId  = useTenantId();

	const { staffs } = useStaffs(tenantId);



	// Filter out services without valid IDs to prevent Radix UI Select errors
	const validStaffs = staffs.filter(
		(staff) => staff.id && staff.id.trim() !== "",
	);

	// Don't render anything if tenantId is not available or no valid services
	if (!tenantId || validStaffs.length === 0) {
		return null;
	}

	return (
		<Select
			classNames={{
				trigger:"p-2"
			}}
			onChange={onSelect}
			value={staffId}
			customOptionRender={(option) => {
				const staff = validStaffs.find((s) => s.id === option.value);
				if (!staff) return null;
				return (

					<span className="flex gap-2 items-center">
						<Avatar src={staff.avatarUrl} alt={staff.name} className="size-6" />
							{staff.name}</span>
			)}}

			options={validStaffs.map((staff) => ({
				label: staff.name as TranslationKey,
				value: staff.id,
			}))}
		/>
	);
};

import { useStaffs } from "@novahair/client";
import { Avatar } from "@novahair/ui";
import { Select } from "@novahair/ui/select";
import type { TranslationKey } from "@novahair/utils/i18n/types";
import { t } from "i18next";


type Props = {
	tenantId: string;
	staffId?: string;
	onSelect: (staffId?: string) => void;
}
export const StaffSwitcher = ({ tenantId, staffId, onSelect }: Props) => {

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
			nullable
			nullableLabel={"all_staff"}
			placeholder={"select_staff"}
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

import type { Staff } from "@novahair/client";
import { Avatar } from "./avatar";
 type Props = {
	name: Staff["name"];
	avatarUrl?: string | null;
};
export const StaffChip = ({ name,avatarUrl }: Props) => {
	return (
		<div className="flex gap-2 items-center">
					<Avatar	src={avatarUrl ?? ""} alt={name} />
					{name}
				</div>
	);
};

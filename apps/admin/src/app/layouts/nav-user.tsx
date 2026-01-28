import { Avatar } from "@novahair/ui/avatar";
import type { SidebarUser } from "./app-sidebar";

export function NavUser({ user }: { user: SidebarUser }) {
	return (
		<div className="flex p-1 items-center gap-2">
			<Avatar className="size-6 rounded-lg" src={user.avatar} alt={user.name} />
				 
			<div className="grid flex-1 text-left text-sm leading-tight">
				<span className="truncate font-medium">{user.name}</span>
				<span className="truncate text-xs">{user.email}</span>
			</div>
		</div>
	);
}

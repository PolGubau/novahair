import { Avatar, AvatarFallback, AvatarImage } from "../../avatar";
import type { SidebarUser } from "./app-sidebar";

export function NavUser({ user }: { user: SidebarUser }) {
	return (
		<div className="flex p-4 items-center gap-2">
			<Avatar className="h-8 w-8 rounded-lg">
				<AvatarImage src={user.avatar} alt={user.name} />
				<AvatarFallback className="rounded-lg">PO</AvatarFallback>
			</Avatar>
			<div className="grid flex-1 text-left text-sm leading-tight">
				<span className="truncate font-medium">{user.name}</span>
				<span className="truncate text-xs">{user.email}</span>
			</div>
		</div>
	);
}

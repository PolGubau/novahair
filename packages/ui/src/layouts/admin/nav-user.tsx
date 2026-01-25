import { Avatar, AvatarFallback, AvatarImage, getInitial } from "../../avatar";
import type { SidebarUser } from "./app-sidebar";

export function NavUser({ user }: { user: SidebarUser }) {
	return (
		<div className="flex p-1 items-center gap-2">
			<Avatar className="size-6 rounded-lg">
				<AvatarImage src={user.avatar} alt={user.name} />
				<AvatarFallback className="rounded-lg">
					{getInitial(user.name)}
				</AvatarFallback>
			</Avatar>
			<div className="grid flex-1 text-left text-sm leading-tight">
				<span className="truncate font-medium">{user.name}</span>
				<span className="truncate text-xs">{user.email}</span>
			</div>
		</div>
	);
}

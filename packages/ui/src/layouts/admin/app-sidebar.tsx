import type { TranslationKey } from "@novahair/utils/i18n/setup";
import {
	Database,
	GalleryVerticalEnd,
	SlidersHorizontal,
	Users,
} from "lucide-react";
import * as React from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "../../sidebar";
import { TeamSwitcher } from "./location-switcher";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

export type Team = {
	name: string;
	logo: React.ComponentType;
	plan: string;
};
export type NavMainItem = {
	title: TranslationKey;
	icon?: React.ComponentType;
	isActive?: boolean;

	items?: {
		title: TranslationKey;
		url: string;
	}[];
};

export type SidebarUser = {
	name: string;
	email: string;
	avatar?: string;
};
export type SidebarMenuConfig = {
	user: SidebarUser;
	teams: Team[];
	navMain: NavMainItem[];
};

const data: SidebarMenuConfig = {
	user: {
		name: "Admin",
		email: "Site Administrator",
	},
	teams: [
		{
			name: "Peluquería Mataró",
			logo: GalleryVerticalEnd,
			plan: "Enterprise",
		},
	],
	navMain: [
		{
			title: "management",
			icon: SlidersHorizontal,
			isActive: true,
			items: [
				{
					title: "view_appointments",
					url: "/appointments/table",
				},
			],
		},
		{
			title: "services",
			icon: Database,
			items: [
				{
					title: "your_services",
					url: "/services",
				},
			],
		},
		{
			title: "team",
			icon: Users,
			items: [
				{
					title: "team_members",
					url: "/team/members",
				},
			],
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const [pathname, setPathname] = React.useState("");

	React.useEffect(() => {
		if (typeof window !== "undefined") {
			setPathname(window.location.pathname);
		}
	}, []);

	const itemsWithActive = data.navMain.map((item) => {
		const isActive =
			item.items?.some((subItem) => subItem.url === pathname) ?? false;
		return { ...item, isActive };
	});

	return (
		<Sidebar collapsible="icon" variant="sidebar" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={data.teams} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={itemsWithActive} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}

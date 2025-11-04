"use client";

import {
	AudioWaveform,
	Command,
	GalleryVerticalEnd,
	Settings2,
	SlidersHorizontal,
	Users,
} from "lucide-react";
import type * as React from "react";
import type { TranslationKey } from "~/shared/i18n/setup";
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
	url: string;
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
export type SidebarMenu = {
	user: SidebarUser;
	teams: Team[];
	navMain: NavMainItem[];
};

const data: SidebarMenu = {
	user: {
		name: "Pofubu martinez",
		email: "pofuvu@martinez.com",
		avatar: "/avatars/shadcn.jpg",
	},
	teams: [
		{
			name: "Peluquería Mataró",
			logo: GalleryVerticalEnd,
			plan: "Enterprise",
		},
		{
			name: "Barbería San Sadurní d'Anoia",
			logo: AudioWaveform,
			plan: "Startup",
		},
		{
			name: "Salon de Belleza Cubelles",
			logo: Command,
			plan: "Free",
		},
	],
	navMain: [
		{
			title: "management",
			url: "#",
			icon: SlidersHorizontal,
			isActive: true,
			items: [
				{
					title: "view_appointments",
					url: "/admin/general/appointments",
				},
				{
					title: "your_services",
					url: "/admin/general/services",
				},
			],
		},
		{
			title: "team",
			url: "#",
			icon: Users,
			items: [
				{
					title: "team_members",
					url: "/admin/team/members/",
				},
			],
		},

		{
			title: "settings",
			url: "#",
			icon: Settings2,
			items: [
				{
					title: "general",
					url: "#",
				},
				{
					title: "profile",
					url: "#",
				},
			],
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" variant="sidebar" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={data.teams} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}

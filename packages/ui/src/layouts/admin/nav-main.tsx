"use client";

import { Link } from "@tanstack/react-router";
import { t } from "i18next";
import { ChevronRight } from "lucide-react";
import { Button } from "../../button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../../collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubItem,
} from "../../sidebar";
import type { NavMainItem } from "./app-sidebar";

export function NavMain({ items }: { items: NavMainItem[] }) {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>{t("platform")}</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => (
					<Collapsible
						key={item.title}
						asChild
						defaultOpen={item.isActive}
						className="group/collapsible"
					>
						<SidebarMenuItem>
							<CollapsibleTrigger asChild>
								<Button
									variant="ghost"
									className="peer/menu-button flex w-full items-center gap-2"
								>
									{item.icon && <item.icon />}
									<span>{t(item.title)}</span>
									<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
								</Button>
							</CollapsibleTrigger>
							<CollapsibleContent className="transition-all">
								<SidebarMenuSub>
									{item.items?.map((subItem) => (
										<SidebarMenuSubItem key={subItem.title}>
											<Button variant="link" className="py-0 h-fit">
												<Link
													to={subItem.url as string}
													className="flex w-full"
												>
													<span>{t(subItem.title)}</span>
												</Link>
											</Button>
										</SidebarMenuSubItem>
									))}
								</SidebarMenuSub>
							</CollapsibleContent>
						</SidebarMenuItem>
					</Collapsible>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}

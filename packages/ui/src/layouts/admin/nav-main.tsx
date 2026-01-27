"use client";

import { cn } from "@novahair/utils";
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
	useSidebar,
} from "../../sidebar";
import type { NavMainItem } from "./app-sidebar";

export function NavMain({ items }: { items: NavMainItem[] }) {
	const { state } = useSidebar();
	return (
		<SidebarGroup>
			{/* <SidebarGroupLabel>{t("platform")}</SidebarGroupLabel> */}
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
								<Button variant="ghost" className="peer/menu-button w-full">
									<span className={cn({ "pl-1.5": state === "collapsed" })}>
										<item.icon />
									</span>
									<span
										className={cn("w-fit transition-all", {
											" opacity-50 w-0": state === "collapsed",
										})}
									>
										{t(item.title)}
									</span>
									<ChevronRight
										className={cn(
											"ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90",
											{
												hidden: state === "collapsed",
											},
										)}
									/>
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

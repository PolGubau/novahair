"use client";

import {
	Button, Collapsible,
	CollapsibleContent,
	CollapsibleTrigger, SidebarGroup, SidebarMenu,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubItem,
	Tooltip,
	useSidebar
} from "@novahair/ui";
import { cn } from "@novahair/utils";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { NavMainItem } from "./app-sidebar";

export function NavMain({ items }: { items: NavMainItem[] }) {
	const { state,open,setOpen } = useSidebar();
	const { t } = useTranslation();
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
								<Button variant="ghost" className="peer/menu-button w-full" onClick={()=>!open && setOpen(true)}>
									<span className={cn({ "pl-1.5": state === "collapsed" })}>
									<Tooltip label={t(item.title)} disabled={state !== "collapsed"}>
										<item.icon />
									</Tooltip>
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

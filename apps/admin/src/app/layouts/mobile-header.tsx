import { SidebarTrigger, useSidebar } from "@novahair/ui/sidebar";
import { Link } from "@tanstack/react-router";

export function MobileHeader() {
	const { isMobile } = useSidebar();

	if (!isMobile) return null;

	return (
		<header className="sticky top-0 z-20 bg-background border-b border-foreground/10 px-4 py-2 flex items-center justify-between md:hidden">
			<Link to="/" className="flex items-center gap-1.5">
				<div className="size-7 bg-foreground rounded-full flex items-center justify-center text-background font-bold">
					N
				</div>
				<span className="font-semibold text-lg">NovaHair</span>
			</Link>

			<SidebarTrigger className="size-9" />
		</header>
	);
}


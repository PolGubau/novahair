import { ChevronRight, Home } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@novahair/utils";
import { useTranslation } from "react-i18next";

export interface BreadcrumbItem {
	label: string;
	href?: string;
	isActive?: boolean;
}

interface BreadcrumbsProps {
	items: BreadcrumbItem[];
	className?: string;
	homeLink?: string;
}

export function Breadcrumbs({
	items,
	className,
	homeLink = "/",
}: BreadcrumbsProps) {
	const {t}=useTranslation()
	return (
		<nav
			aria-label="breadcrumb"
			className={cn("flex items-center gap-1 text-sm text-muted-foreground", className)}
		>
			<Link
				to={homeLink}
				className="flex items-center gap-1 hover:text-foreground transition-colors"
			>
				<Home className="h-4 w-4" />
				<span className="sr-only">{ t("home")}</span>
			</Link>

			{items.map((item, index) => (
				<div key={index} className="flex items-center gap-1">
					<ChevronRight className="h-4 w-4" />
					{item.href && !item.isActive ? (
						<Link
							to={item.href}
							className="hover:text-foreground transition-colors"
						>
							{item.label}
						</Link>
					) : (
						<span
							className={cn({
								"text-foreground font-medium": item.isActive,
							})}
						>
							{item.label}
						</span>
					)}
				</div>
			))}
		</nav>
	);
}

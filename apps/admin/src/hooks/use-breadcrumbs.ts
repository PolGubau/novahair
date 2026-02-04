import { useLocation } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import type { BreadcrumbItem } from "@novahair/ui/breadcrumbs";
import { TranslationKey } from "@novahair/utils";

const routeLabels: Record<string, TranslationKey> = {
	"/": "dashboard",
	"/appointments": "appointments",
	"/appointments/table": "view_appointments",
	"/services": "your_services",
	"/team": "team",
	"/team/members": "team_members",
	"/team/schedules": "schedules",
	"/settings": "settings",
	"/settings/preferences": "preferences",
};

export function useBreadcrumbs(): BreadcrumbItem[] {
	const location = useLocation();
	const { t } = useTranslation();
	const pathname = location.pathname;

	if (pathname === "/") {
		return [];
	}

	const segments = pathname.split("/").filter(Boolean);
	const breadcrumbs: BreadcrumbItem[] = [];

	let currentPath = "";
	for (let i = 0; i < segments.length; i++) {
		currentPath += `/${segments[i]}`;
		const isLast = i === segments.length - 1;
		const labelKey = routeLabels[currentPath] || segments[i];

		breadcrumbs.push({
			label: t(labelKey) || labelKey,
			href: isLast ? undefined : currentPath,
			isActive: isLast,
		});
	}

	return breadcrumbs;
}

/**
 * Module Dashboard Component
 * 
 * Reusable dashboard component for module index pages
 * Displays quick navigation cards to subpages
 */

import { AdminMain } from "~/app/layouts/admin-main";
import { ClickableMetricCard } from "@novahair/ui/metric-card-clickable";
import type { TranslationKey } from "@novahair/utils";
import type { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

export interface ModuleLink {
	title: TranslationKey;
	description: TranslationKey;
	href: string;
	icon: LucideIcon;
	value?: string;
	trend?: number;
}

interface ModuleDashboardProps {
	title: TranslationKey;
	description: TranslationKey;
	links: ModuleLink[];
	rightContent?: React.ReactNode;
}

export const ModuleDashboard = ({
	title,
	description,
	links,
	rightContent,
}: ModuleDashboardProps) => {
	const { t } = useTranslation();

	return (
		<AdminMain title={title} description={description} rightContent={rightContent}>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{links.map((link) => (
					<ClickableMetricCard
						key={link.href}
						title={t(link.title)}
						description={t(link.description)}
						value={link.value}
						icon={<link.icon className="h-5 w-5" />}
						href={link.href}
						trend={link.trend}
					/>
				))}
			</div>
		</AdminMain>
	);
};


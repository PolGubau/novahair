import { ErrorBoundary } from "@novahair/ui";
import type { ExistingRoute } from "@novahair/utils/types/common";
import { Link } from "@tanstack/react-router";
import { t } from "i18next";

type QuickLink = {
	name: string;
	href: ExistingRoute;
};

export const AdminPage = () => {
	const quickLinks: QuickLink[] = [
		{ href: "/team/members", name: t("manage_team") },
		{ href: "/appointments/table", name: t("check_all_appointments") },
		{ href: "/services", name: t("your_services") },
	];
	return (
		<section className="p-8">
			<ErrorBoundary>
				<h1 className="text-3xl">{t("administration")}</h1>
				<p>{t("manage_your_team_and_schedules")}</p>
			</ErrorBoundary>

			<ErrorBoundary>
				<ul className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 mt-6 max-w-xl">
					{quickLinks.map((link) => (
						<li className="" key={link.href}>
							<Link className="card clickable" to={link.href as string}>
								{link.name}
							</Link>
						</li>
					))}
				</ul>
			</ErrorBoundary>
		</section>
	);
};

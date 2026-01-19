import { Link } from "@tanstack/react-router";
import { t } from "i18next";
import type { ExistingRoute } from "@novahair/utils/types/common";

type QuickLink = {
	name: string;
	href: ExistingRoute;
};
const quickLinks: QuickLink[] = [
	{ name: t("manage_team"), href: "/team/members" },
	{ name: t("check_all_appointments"), href: "/appointments/table" },
	{ name: t("your_services"), href: "/services" },
];

export const AdminPage = () => {
	return (
		<section className="p-8">
			<h1 className="text-3xl">{t("administration")}</h1>
			<p>{t("manage_your_team_and_schedules")}</p>

			<ul className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 mt-6 max-w-xl">
				{quickLinks.map((link) => (
					<li key={link.href} className="">
						<Link to={link.href as string} className="card clickable">
							{link.name}
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
};

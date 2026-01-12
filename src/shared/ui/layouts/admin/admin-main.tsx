import { t } from "i18next";
import type React from "react";
import type { TranslationKey } from "~/shared/i18n/setup";

type Props = {
	title: TranslationKey;
	description: TranslationKey;
	children: React.ReactNode;
};

export const AdminMain = ({ title, description, children }: Props) => {
	return (
		<section className="p-6">
			<h1 className="text-xl md:text-3xl">{t(title)}</h1>
			<p className="text-foreground/70">{t(description)}</p>
			<div className="mt-10 flex gap-4 flex-col">{children}</div>
		</section>
	);
};

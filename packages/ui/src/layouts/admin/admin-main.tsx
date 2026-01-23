import type { TranslationKey } from "@novahair/utils/i18n/setup";
import type React from "react";
import { useTranslation } from "react-i18next";

type Props = {
	title: TranslationKey;
	description: TranslationKey;
	children: React.ReactNode;
};

export const AdminMain = ({ title, description, children }: Props) => {
	const { t } = useTranslation();
	return (
		<section className="p-5 gap-6 flex flex-col h-full">
			<header>
				<h1 className="text-xl md:text-2xl">{t(title)}</h1>
				<p className="text-foreground/70">{t(description)}</p>
			</header>
			<div className="flex gap-4 flex-col h-full">{children}</div>
		</section>
	);
};

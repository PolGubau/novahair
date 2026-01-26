import type { TranslationKey } from "@novahair/utils/i18n/setup";
import type React from "react";
import { useTranslation } from "react-i18next";

type Props = {
	title: TranslationKey;
	description: TranslationKey;
	children: React.ReactNode;
	rightContent?: React.ReactNode;
};

export const AdminMain = ({
	title,
	description,
	children,
	rightContent,
}: Props) => {
	const { t } = useTranslation();
	return (
		<section className="p-4 gap-3 flex flex-col h-full">
			<header className="flex justify-between items-center">
				<div className="flex flex-col gap-1">
					<h1 className="text-xl md:text-2xl">{t(title)}</h1>
					<p className="text-foreground/70">{t(description)}</p>
				</div>
				{rightContent && (
					<div className="flex gap-2 items-center">{rightContent}</div>
				)}
			</header>
			<div className="flex gap-4 flex-col h-full">{children}</div>
		</section>
	);
};

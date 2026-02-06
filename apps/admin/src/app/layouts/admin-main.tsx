import type { TranslationKey } from "@novahair/utils/i18n/types";

import { useTranslation } from "react-i18next";
import type React from "react";
import { cn } from "@novahair/utils";

type Props = {
	title: TranslationKey;
	description: TranslationKey;
	children: React.ReactNode;
	rightContent?: React.ReactNode;
	className?:string;
};

export const AdminMain = ({
	title,
	description,
	children,
	rightContent,
	className
}: Props) => {
	const { t } = useTranslation();
	return (
		<section className={cn(`gap-6 grid grid-rows-[auto_1fr] h-full overflow-hidden`, className)}>
			<header className="flex justify-between md:items-center gap-4">
				<div className="flex flex-col gap-1">
					<h1 className="text-xl md:text-2xl font-bold tracking-tight">{t(title)}</h1>
					<p className="text-sm text-foreground/70">{t(description)}</p>
				</div>
				{rightContent && (
					<div className="flex gap-2 items-center">{rightContent}</div>
				)}
			</header>
			<div className="flex gap-4 flex-col h-full overflow-y-auto">{children}</div>
		</section>
	);
};

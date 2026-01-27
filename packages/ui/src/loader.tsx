import type { TranslationKey } from "@novahair/utils";
import { cn } from "@novahair/utils/lib/cn";
import { useTranslation } from "react-i18next";
import { Loader as Icon, type LucideProps } from "lucide-react";

type Props = LucideProps & {
	label?: TranslationKey;
	hasLabel?: boolean;
};
export const Loader = ({
	className,
	label = "loading",
	hasLabel = true,
	...rest
}: Props) => {
	const { t } = useTranslation();
	return (
		<output className={cn("flex gap-2 items-center font-medium", className)}>
			<Icon
				{...rest}
				className={cn("animate-spin size-6 text-current", className)}
			/>
			{hasLabel && <span className="">{t(label)}</span>}
		</output>
	);
};

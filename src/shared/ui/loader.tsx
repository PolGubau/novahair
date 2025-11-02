import { t } from "i18next";
import { Loader as Icon, type LucideProps } from "lucide-react";
import { cn } from "~/lib/cn";
import type { TranslationKey } from "../i18n/setup";

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
	return (
		<output
			className={cn(
				"flex gap-2 items-center text-primary font-medium",
				className,
			)}
		>
			<Icon
				{...rest}
				className={cn("animate-spin size-6 text-primary", className)}
			/>
			{hasLabel && <span className="">{t(label)}</span>}
		</output>
	);
};

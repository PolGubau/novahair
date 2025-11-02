import { t } from "i18next";
import type React from "react";
import { cn } from "~/lib/cn";

type Props = React.LabelHTMLAttributes<HTMLLabelElement> & {
	label: string;
	required?: boolean;
};
export const Label = ({ label, htmlFor, required, ...props }: Props) => {
	return (
		<label
			htmlFor={htmlFor}
			className={cn(labelClasses.base, props.className)}
			data-slot={"label"}
			{...props}
		>
			<span className="">{label}</span>
			{!required && (
				<span className="text-foreground/80 text-thin text-xs">
					{`(${t("optional")})`}
				</span>
			)}
		</label>
	);
};

export const labelClasses = {
	base: "block mb-1 text-sm font-medium text-foreground flex items-center gap-1.5",
};

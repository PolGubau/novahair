import { cn } from "@novahair/utils/lib/cn";
import { cva } from "class-variance-authority";
import { Button, type ButtonProps } from "./button";
import { Tooltip } from "./tooltip";

export type IconButtonProps = ButtonProps & {
	label?: string;
	icon?: React.ReactNode;
};

const iconButtonVariants = cva("aspect-square rounded-full", {
	variants: {
		size: {
			md: "size-9 has-[>svg]:p-3",
			sm: "size-8 has-[>svg]:px-2.5",
			lg: "size-10 has-[>svg]:p-4",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

export function IconButton({
	className,
	variant = "secondary",
	asChild = false,
	size,
	icon,
	...props
}: IconButtonProps) {
	return (
		<Tooltip label={props.label}>
			<Button
				data-slot="icon-button"
				className={cn(iconButtonVariants({ size }), className)}
				variant={variant}
				size={size}
				asChild={asChild}
				{...props}
			>
				{icon ?? props.children}
			</Button>
		</Tooltip>
	);
}

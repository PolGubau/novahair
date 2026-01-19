import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";
import {
	CheckboxIndicator as CheckboxIndicatorPrimitive,
	CheckboxRoot as CheckboxPrimitive,
	type CheckboxProps as CheckboxPrimitiveProps,
} from "./primitives";

const checkboxVariants = cva(
	"peer shrink-0 flex items-center justify-center outline-none focus-visible:ring-[3px] focus-visible:ring-foreground/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-500 focus-visible:ring-offset-1 [&[data-state=checked],&[data-state=indeterminate]]:bg-foreground [&[data-state=checked],&[data-state=indeterminate]]:text-background bg-background border",
	{
		variants: {
			size: {
				md: "size-5 rounded-[7px]",
				sm: "size-4.5 rounded-[5px]",
				lg: "size-6 rounded-[7px]",
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
);

const checkboxIndicatorVariants = cva("", {
	variants: {
		size: {
			md: "size-3.5",
			sm: "size-3",
			lg: "size-4",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

type CheckboxProps = CheckboxPrimitiveProps &
	VariantProps<typeof checkboxVariants>;

function Checkbox({
	className,
	children,
	size = "md",
	...props
}: CheckboxProps) {
	return (
		<CheckboxPrimitive
			className={cn(checkboxVariants({ size, className }))}
			{...props}
		>
			{children}
			<CheckboxIndicatorPrimitive
				className={cn(checkboxIndicatorVariants({ size }))}
			/>
		</CheckboxPrimitive>
	);
}

export { Checkbox, type CheckboxProps };

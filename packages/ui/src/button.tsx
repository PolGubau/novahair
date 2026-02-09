import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@novahair/utils/lib/cn";
import { Loader } from "./loader";
import { Ripple } from "./ripple/ripple";

const buttonVariants = cva(
	"group relative overflow-hidden inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none border-2 focus-visible:border-2 focus-visible:border-foreground aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40 aria-invalid:border-error border-transparent cursor-pointer",
	{
		variants: {
			variant: {
				primary: "bg-accent text-background hover:bg-accent/90 ",
				error:
					"bg-destructive text-background hover:bg-destructive/90 focus-visible:border-destructive/20 dark:focus-visible:border-destructive/40 dark:bg-destructive/60",
				outline:
					"bg-transparent shadow-xs hover:bg-foreground/10 border-foreground/20",
				secondary: "bg-primary text-background hover:brightness-90 ",
				ghost: "hover:bg-primary/10",
				link: "text-foreground underline-offset-4 hover:underline",
			},
			size: {
				md: "h-9 px-4 py-2 has-[>svg]:px-3",
				sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
				lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
			},
		},
		defaultVariants: {
			variant: "secondary",
			size: "md",
		},
	},
);


type ButtonProps = React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		loading?: boolean;
		asChild?: boolean;
		size?: "sm" | "md" | "lg";
		variant?: "primary" | "error" | "outline" | "secondary" | "ghost" | "link";
	};

function Button({
	className,
	variant = "secondary",
	size,
	loading,
	asChild = false,
	...props
}: ButtonProps) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			data-slot="button"
			type={props.type || "button"}
			disabled={props.disabled || loading}
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		>
 
			{loading && <Loader hasLabel={false} className={cn("size-4")} />}
			<Ripple />
 
			{props.children}
		</Comp>
	);
}

export { Button, buttonVariants, type ButtonProps };

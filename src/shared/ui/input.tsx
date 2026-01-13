import { useId } from "react";
import { cn } from "~/lib/cn";
import type { Breakpoints } from "../types/common";
import { Label } from "./label";

type Props = Omit<React.ComponentProps<"input">, "size"> & {
	label?: string;
	size?: Breakpoints;
};

function Input({ className, label, type, size = "md", ...props }: Props) {
	const id = useId();
	return (
		<div>
			{label && <Label htmlFor={id} label={label} required={props.required} />}

			<input
				id={id}
				data-size={size}
				type={type}
				data-slot="input"
				className={cn(inputTheme, className)}
				{...props}
			/>
		</div>
	);
}

export { Input };

export const inputTheme = cn(
	"file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium text-base",

	// Disabled
	"disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed ",

	// Focus
	"focus-visible:ring-[3px] focus-visible:border-foreground/40 focus-visible:ring-foreground/10",

	// Border
	"border-2 border-foreground/20 ",

	// Base
	"flex items-center justify-between gap-2 md:text-sm rounded-md w-full min-w-0 transition-[color,box-shadow] outline-none whitespace-nowrap bg-transparent text-sm shadow-xs text-foreground",

	// Placeholder
	"placeholder:text-foreground/60 placeholder:text-sm",
	// Invalid
	"aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40 aria-invalid:border-error",
	// Padding
	"pr-2 pl-3 py-1",
	// Height
	"data-[placeholder]:text-sm data-placeholder:text-foreground/70",
	"data-[size=md]:h-9 data-[size=sm]:h-7 data-[size=xs]:h-5 data-[size=lg]:h-11 data-[size=xl]:h-13",

	// Icon
	"[&_svg]:pointer-events-none [&_svg:not([class*='text-'])]:text-foreground/80 [&_svg]:text-foreground [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
);

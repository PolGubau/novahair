import { useId } from "react";
import { cn } from "~/lib/cn";
import { Label } from "./label";

type Props = React.ComponentProps<"input"> & {
	label?: string;
};

function Input({ className, label, type, ...props }: Props) {
	const id = useId();
	return (
		<div>
			{label && <Label htmlFor={id} label={label} required={props.required} />}

			<input
				id={id}
				type={type}
				data-slot="input"
				className={cn(
					"file:text-foreground h-9 min-w-0  px-3 py-1 file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium ",

					baseInputClasses.base,
					className,
				)}
				{...props}
			/>
		</div>
	);
}

export { Input };

export const baseInputClasses = {
	base: "placeholder:text-foreground/50 selection:bg-primary  border w-full rounded-md selection:text-primary-foreground border-foreground/20 bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed flex disabled:opacity-50 md:text-sm focus-visible:border-primary/20 focus-visible:ring-primary/10 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
};

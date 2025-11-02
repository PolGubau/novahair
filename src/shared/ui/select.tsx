import { ChevronDownIcon } from "lucide-react";
import type * as React from "react";

import { cn } from "~/lib/cn";
import { baseInputClasses } from "./input";

function Select({ className, ...props }: React.ComponentProps<"select">) {
	return (
		<div
			className="group/native-select relative w-fit has-[select:disabled]:opacity-50"
			data-slot="native-select-wrapper"
		>
			<select
				data-slot="native-select"
				className={cn(
					"h-9 w-full min-w-0 appearance-none px-3 py-2 pr-9",
					baseInputClasses.base,
					className,
				)}
				{...props}
			/>
			<ChevronDownIcon
				className="text-muted-foreground pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 opacity-50 select-none"
				aria-hidden="true"
				data-slot="native-select-icon"
			/>
		</div>
	);
}

function SelectOption({ ...props }: React.ComponentProps<"option">) {
	return <option data-slot="native-select-option" {...props} />;
}

function SelectOptGroup({
	className,
	...props
}: React.ComponentProps<"optgroup">) {
	return (
		<optgroup
			data-slot="native-select-optgroup"
			className={cn(className)}
			{...props}
		/>
	);
}

export { Select, SelectOptGroup, SelectOption };

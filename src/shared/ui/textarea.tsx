import { useId } from "react";
import { cn } from "~/lib/cn";
import { baseInputClasses } from "./input";
import { Label } from "./label";

type Props = React.ComponentProps<"textarea"> & {
	label?: string;
};

function Textarea({ className, label, ...props }: Props) {
	const id = useId();

	return (
		<div>
			{label && <Label htmlFor={id} label={label} required={props.required} />}
			<textarea
				data-slot="textarea"
				className={cn(
					"field-sizing-content min-h-16 max-h-96 px-3 py-2",
					baseInputClasses.base,
					className,
				)}
				{...props}
			/>
		</div>
	);
}

export { Textarea };

import { useId } from "react";
import { cn } from "~/shared/lib/cn";
import { inputTheme } from "./input";
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
					"field-sizing-content min-h-20 max-h-96 py-2 resize-none",
					inputTheme,
					className,
				)}
				{...props}
			/>
		</div>
	);
}

export { Textarea };

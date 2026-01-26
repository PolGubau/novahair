import { useId } from "react";
import { Ripple } from "../ripple/ripple";
import { Checkbox, type CheckboxProps } from "./checkbox";

export type CheckboxChipProps = CheckboxProps & {
	label: string;
};

export const CheckboxChip = ({ label, ...rest }: CheckboxChipProps) => {
	const id = useId();
	return (
		<label
			data-slot="field-label"
			className=" overflow-hidden relative items-center text-sm font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border *:data-[slot=field]:p-1.5 has-data-[state=checked]:bg-foreground/5 has-data-[state=checked]:border-foreground  "
			htmlFor={rest.id ?? id}
		>
			<div
				data-slot="field"
				data-orientation="horizontal"
				className="group/field flex w-full data-[invalid=true]:text-destructive flex-row items-center gap-1.5 overflow-hidden px-3 py-1.5 transition-all duration-300 ease-linear   has-data-[state=checked]:pl-10"
			>
				<Ripple />
				<Checkbox id={rest.id ?? id} {...rest} />
				<div
					data-slot="field-label"
					className="flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50 transition-all duration-300"
				>
					{label}
				</div>
			</div>
		</label>
	);
};

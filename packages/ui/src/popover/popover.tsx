import { cn } from "@novahair/utils";
import { X } from "lucide-react";
import type { Popover as P } from "radix-ui";
import { Button } from "../button";
import { IconButton } from "../icon-button";
import {
	PopoverClose,
	PopoverContent,
	PopoverRoot,
	PopoverTrigger,
} from "./primitives";

export interface PopoverProps extends Omit<P.PopoverContentProps, "content"> {
	children: React.ReactNode;
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	modal?: boolean;
	closeClassName?: string;
	closeIcon?: React.ReactNode;
	trigger?: React.ReactNode;
	label?: string;
	arrowClassName?: string;
	disabled?: boolean;
}
export const Popover = ({
	children,
	open,
	defaultOpen,
	onOpenChange,
	modal,
	trigger,
	label = "Open Menu",
	closeClassName,
	closeIcon = <X />,
	disabled = false,
	arrowClassName,
	...rest
}: PopoverProps) => {
	const triggerNode = trigger || <Button name={label}>{label}</Button>;

	return (
		<PopoverRoot
			defaultOpen={defaultOpen}
			modal={modal}
			onOpenChange={onOpenChange}
			open={open}
		>
			<PopoverTrigger asChild={true} disabled={disabled}>
				<div>{triggerNode}</div>
			</PopoverTrigger>
			{!disabled && (
				<PopoverContent {...rest}>
					<PopoverClose
						aria-label="Close"
						asChild={true}
						className={cn(closeClassName)}
					>
						<IconButton>{closeIcon}</IconButton>
					</PopoverClose>
					{children}
				</PopoverContent>
			)}
		</PopoverRoot>
	);
};

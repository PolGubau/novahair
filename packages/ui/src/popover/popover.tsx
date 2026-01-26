import { type TranslationKey, cn } from "@novahair/utils";
import { t } from "i18next";
import { X } from "lucide-react";
import type { Popover as P } from "radix-ui";
import { Button } from "../button";
import { IconButton } from "../icon-button";
import {
	PopoverClose,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverRoot,
	PopoverTitle,
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
	title: TranslationKey;
	description?: TranslationKey;
}
export const Popover = ({
	children,
	open,
	defaultOpen,
	description,
	onOpenChange,
	modal,
	trigger,
	title,
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
					<header className="grid grid-cols-[1fr_auto] items-center gap-1">
						<PopoverHeader>
							{title && <PopoverTitle>{t(title)}</PopoverTitle>}
							{description && (
								<PopoverDescription>{t(description)}</PopoverDescription>
							)}
						</PopoverHeader>
						<PopoverClose
							aria-label="Close"
							asChild={true}
							className={cn(closeClassName)}
						>
							<IconButton variant="ghost" size="sm">
								{closeIcon}
							</IconButton>
						</PopoverClose>
					</header>

					{children}
				</PopoverContent>
			)}
		</PopoverRoot>
	);
};

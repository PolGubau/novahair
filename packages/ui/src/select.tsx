import type { TranslationKey } from "@novahair/utils/i18n/types";
import { cn } from "@novahair/utils/lib/cn";
import type { Sizes } from "@novahair/utils/types/common";
import * as SelectPrimitive from "@radix-ui/react-select";
import { t } from "i18next";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { JSX, useId } from "react";
import { inputTheme } from "./input";
import { Label } from "./label";
import { Spinner } from "./spinner";

export type Option = { value: string; label: TranslationKey };

type SelectPropsBase = Omit<
	React.ComponentProps<typeof SelectPrimitive.Root>,
	"children"
	> & {
	classNames?: {
 		trigger?: string;
		content?: string;
			label?: string;
		item?: string
 
	};
	size?: Sizes;
	required?: boolean;
	loading?: boolean;
	nullableLabel?: TranslationKey;
	id?: string;
	label?: TranslationKey;
	customOptionRender?: (option: Option) => React.ReactNode;
	placeholder?: TranslationKey;
	options: Option[];
};

type SelectPropsNullable = SelectPropsBase & {
	nullable: true;
	onChange?: (value: string | undefined) => void;
};

type SelectPropsNonNullable = SelectPropsBase & {
	nullable?: false;
	onChange?: (value: string) => void;
};

export type SelectProps = SelectPropsNullable | SelectPropsNonNullable;

function Select(props: SelectPropsNullable): JSX.Element;
function Select(props: SelectPropsNonNullable): JSX.Element;
function Select({
	label,
	placeholder = "select_option",
	options = [],
	nullable = false,
	nullableLabel,
	classNames,loading,
	...props
}: SelectProps) {
	const id = useId();


	if (loading || options.length === 0) {
		return (
			<WithField label={label} id={props.id || id} className={classNames?.label} required={props.required}>
				<div className={cn(inputTheme,"flex justify-center")}>
					<Spinner />
				</div>
			</WithField>
		);
	}

	return (
		<WithField label={label} id={props.id || id} className={classNames?.label} required={props.required}>
			<SelectRoot data-slot="select" {...props} onValueChange={(value) => {
				if (nullable && value === "all") {
					(props.onChange as (value: string | undefined) => void)?.(undefined);
				} else {
					props.onChange?.(value);
				}
			}}>
				<SelectTrigger className={classNames?.trigger}>
					<SelectValue placeholder={t(placeholder)} /> 
				</SelectTrigger>
				<SelectContent className={classNames?.content}>
					{nullable && (
						<SelectItem value={"all"} className={classNames?.item}>
							{t(nullableLabel || placeholder)}
						</SelectItem>
					)}
					{options?.map((option) => (
						<SelectItem key={option.value} value={option.value} className={classNames?.item}>
							{props.customOptionRender
								? props.customOptionRender(option)
								: t(option.label)}
						</SelectItem>
					))}
					{!options || options.length === 0 ? (
						<SelectItem value="" disabled className={classNames?.item}>
							{t("no_options")}
						</SelectItem>
					) : null}
				</SelectContent> 
			</SelectRoot></WithField>
	);
}
type WithFieldProps = Pick<SelectProps, "label" | "required" | "id"> & {
	className?: string;
};

function WithField({ label, id, children, className,required }: React.PropsWithChildren<WithFieldProps>) {
	return <div className="flex flex-col gap-1">
	{label && (
		<Label htmlFor={id} label={t(label)} required={required} className={className} />
	)}
{children}
</div>
}


function SelectRoot({
	...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
	return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({
	...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
	return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({
	...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
	return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
	className,
	size = "md",
	children,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
	size?: Sizes;
}) {
	return (
		<SelectPrimitive.Trigger
			data-slot="select-trigger"
			data-size={size}
			className={cn(
				inputTheme,
				"*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2",
				className,
			)}
			{...props}
		>
			{children}
			<SelectPrimitive.Icon asChild>
				<ChevronDownIcon className="size-4 opacity-50" />
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	);
}

function SelectContent({
	className,
	children,
	position = "item-aligned",
	align = "center",
	...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content
				data-slot="select-content"
				className={cn(
					"bg-background text-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-32 origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
					position === "popper" &&
						"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
					className,
				)}
				position={position}
				align={align}
				{...props}
			>
				<SelectScrollUpButton />
				<SelectPrimitive.Viewport
					className={cn(
						"p-1",
						position === "popper" &&
							"h-(--radix-select-trigger-height) w-full min-w-(--radix-select-trigger-width) scroll-my-1",
					)}
				>
					{children}
				</SelectPrimitive.Viewport>
				<SelectScrollDownButton />
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	);
}

function SelectLabel({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
	return (
		<SelectPrimitive.Label
			data-slot="select-label"
			className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
			{...props}
		/>
	);
}

function SelectItem({
	className,
	children,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
	return (
		<SelectPrimitive.Item
			data-slot="select-item"
			className={cn(
				"focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
				className,
			)}
			{...props}
		>
			<span
				data-slot="select-item-indicator"
				className="absolute right-2 flex size-3.5 items-center justify-center"
			>
				<SelectPrimitive.ItemIndicator>
					<CheckIcon className="size-4" />
				</SelectPrimitive.ItemIndicator>
			</span>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	);
}

function SelectSeparator({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
	return (
		<SelectPrimitive.Separator
			data-slot="select-separator"
			className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
			{...props}
		/>
	);
}

function SelectScrollUpButton({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
	return (
		<SelectPrimitive.ScrollUpButton
			data-slot="select-scroll-up-button"
			className={cn(
				"flex cursor-default items-center justify-center py-1",
				className,
			)}
			{...props}
		>
			<ChevronUpIcon className="size-4" />
		</SelectPrimitive.ScrollUpButton>
	);
}

function SelectScrollDownButton({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
	return (
		<SelectPrimitive.ScrollDownButton
			data-slot="select-scroll-down-button"
			className={cn(
				"flex cursor-default items-center justify-center py-1",
				className,
			)}
			{...props}
		>
			<ChevronDownIcon className="size-4" />
		</SelectPrimitive.ScrollDownButton>
	);
}

export {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger,
	SelectValue
};


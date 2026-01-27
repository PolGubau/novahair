import { cn, Sizes } from "@novahair/utils";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

export type AvatarRootProps = React.ComponentProps<typeof AvatarPrimitive.Root> & {
	size?: Sizes;
};

export function AvatarRoot({
	className,
	size = "md",
	...props
}:AvatarRootProps) {
	return (
		<AvatarPrimitive.Root
			data-slot="avatar"
			data-size={size}
			className={cn(
				"group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6 border",
				className,
			)}
			{...props}
		/>
	);
}

export type AvatarImageProps = React.ComponentProps<typeof AvatarPrimitive.Image>;
export function AvatarImage({
	className,
	...props
}: AvatarImageProps) {
	return (
		<AvatarPrimitive.Image
			data-slot="avatar-image"
			className={cn("aspect-square object-cover size-full", className)}
			{...props}
		/>
	);
}

export type AvatarFallbackProps = React.ComponentProps<typeof AvatarPrimitive.Fallback>;
export function AvatarFallback({
	className,
	...props
}: AvatarFallbackProps) {
	return (
		<AvatarPrimitive.Fallback
			data-slot="avatar-fallback"
			className={cn(
				"bg-background text-foreground flex size-full items-center justify-center rounded-full text-sm group-data-[size=sm]/avatar:text-xs",
				className,
			)}
			{...props}
		/>
	);
}

export type AvatarComponent = AvatarRootProps & {
 	src: string|undefined;
	alt: string;
	imageProps?: AvatarImageProps
	fallbackProps?: AvatarFallbackProps
	fallback?: React.ReactElement 
};
export function Avatar({ fallback,src, alt, imageProps, fallbackProps, ...props }: AvatarComponent) {
	return (
		<AvatarRoot {...props}>
			<AvatarImage src={src} alt={alt} {...imageProps} />
			<AvatarFallback {...fallbackProps}>{fallback ?? getInitial(alt)}</AvatarFallback>
		</AvatarRoot>
	)
}




export function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="avatar-badge"
			className={cn(
				"bg-primary text-primary-foreground ring-background absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full ring-2 select-none",
				"group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
				"group-data-[size=md]/avatar:size-2.5 group-data-[size=md]/avatar:[&>svg]:size-2",
				"group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
				className,
			)}
			{...props}
		/>
	);
}

export function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="avatar-group"
			className={cn(
				"*:data-[slot=avatar]:ring-background group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2",
				className,
			)}
			{...props}
		/>
	);
}

export function AvatarGroupCount({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="avatar-group-count"
			className={cn(
				"bg-muted text-muted-foreground ring-background relative flex size-8 shrink-0 items-center justify-center rounded-full text-sm ring-2 group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
				className,
			)}
			{...props}
		/>
	);
}
export function getInitial(name: string) {
	if (!name) return "?";
	return name.charAt(0).toUpperCase();
}
 
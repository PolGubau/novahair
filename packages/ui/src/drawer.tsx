import type { TranslationKey } from "@novahair/utils/i18n/setup";
import { cn } from "@novahair/utils/lib/cn";
import { useTranslation } from "react-i18next";
import { Drawer as D, type DialogProps } from "vaul";

type Props = DialogProps & {
	footer?: React.ReactNode;
	className?: string;
	header?: React.ReactNode;
	title?: TranslationKey;
	description?: TranslationKey;
	classNames?: {
		overlay?: string;
		content?: string;
		header?: string;
		handle?: string;
		body?: string;
		footer?: string;
	};
};
export const Drawer = ({
	children,
	footer,
	className,
	header,
	title,
	description,
	classNames,
	...rest
}: Props) => {
	const { t } = useTranslation();
	return (
		<D.Root {...rest}>
			<D.Portal>
				<D.Overlay
					className={cn(
						"fixed inset-0 bg-foreground/50 backdrop-blur-xs z-20",
						classNames?.overlay,
					)}
				/>
				<D.Content
					className={cn(
						"h-fit fixed flex justify-center bottom-0 left-0 right-0 mx-auto md:max-w-[90vw] outline-none z-50",
						classNames?.content,
					)}
				>
					<div
						className={cn(
							"bg-background grid grid-rows-[auto_1fr_auto] rounded-t-3xl md:rounded-3xl h-fit max-h-[90dvh] shadow-lg md:mb-4 md:max-w-4xl w-full transition-all",
							className,
						)}
					>
						<header
							className={cn("flex flex-col gap-3 p-4", classNames?.header)}
						>
							<D.Handle className={classNames?.handle} />
							{header}
							<div className="flex flex-col gap-1">
								{title && (
									<D.Title className="text-2xl font-semibold text-foreground">
										{t(title)}
									</D.Title>
								)}
								{description && (
									<D.Description className="text-foreground/70 text-md">
										{t(description)}
									</D.Description>
								)}
							</div>
						</header>

						<section
							className={cn(
								"h-full overflow-y-auto relative p-4",
								classNames?.body,
							)}
						>
							{children}
						</section>
						{footer && <div className={classNames?.footer}>{footer}</div>}
					</div>
				</D.Content>
			</D.Portal>
		</D.Root>
	);
};

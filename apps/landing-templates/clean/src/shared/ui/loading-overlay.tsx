import type { PropsWithChildren } from "react";
import { cn } from "~/shared/lib/cn";
import { Loader } from "./loader";

type LoadingOverlayProps = {
	isLoading: boolean;
};

export const LoadingOverlay = ({
	isLoading,
	children,
}: PropsWithChildren<LoadingOverlayProps>) => {
	return (
		<div className="relative">
			{isLoading && (
				<div className="absolute inset-0 flex items-center justify-center z-10">
					<Loader />
				</div>
			)}

			<div
				className={cn({
					"blur-xs": isLoading,
				})}
			>
				{children}
			</div>
		</div>
	);
};

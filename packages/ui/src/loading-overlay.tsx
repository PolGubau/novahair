import { cn } from "@novahair/utils/lib/cn";
import type { PropsWithChildren } from "react";
import { Loader } from "./loader";

type LoadingOverlayProps = {
	isLoading: boolean;
};

export const LoadingOverlay = ({
	isLoading,
	children,
}: PropsWithChildren<LoadingOverlayProps>) => {
	return (
		<div className="relative w-full h-full">
			{isLoading && (
				<div className="absolute inset-0 flex items-center justify-center z-10">
					<Loader />
				</div>
			)}

			<div
				className={cn("h-full", {
					"blur-xs": isLoading,
				})}
			>
				{children}
			</div>
		</div>
	);
};

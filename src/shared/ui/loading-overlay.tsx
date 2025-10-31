import type { PropsWithChildren } from "react";

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
				<div className="absolute inset-0 bg-background/5 backdrop-blur-md flex items-center justify-center z-10">
					<div className="loader">Loading...</div>
				</div>
			)}

			{children}
		</div>
	);
};

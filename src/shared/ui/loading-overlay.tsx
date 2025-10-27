import type { PropsWithChildren } from "react";

type LoadingOverlayProps = {
	isLoading: boolean;
};

export const LoadingOverlay = ({
	isLoading,
	children,
}: PropsWithChildren<LoadingOverlayProps>) => {
	return (
		<>
			{isLoading && (
				<div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
					<div className="loader">Loading...</div>
				</div>
			)}

			{children}
		</>
	);
};

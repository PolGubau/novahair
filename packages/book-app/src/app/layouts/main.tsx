import { ApiErrorFallback } from "@novahair/ui/api-error-fallback";
import { ErrorBoundary } from "@novahair/ui/error-boundary";
import { BookingStep, bookingSteps } from "../../app";
import { BottomNavigation } from "./bottom-navigation";

type MainLayoutProps = {
	children: React.ReactNode;
	currentStep: BookingStep;
	setStep: (step: BookingStep) => void;
};

export function MainLayout({ children, currentStep,setStep }: MainLayoutProps) {
	return (
		<div className="grid grid-rows-[1fr_auto] gap-4 h-full max-w-7xl w-full mx-auto overflow-hidden">

			<main className="h-full grid flex-1 overflow-y-auto pb-4">
				<ErrorBoundary
					fallback={(error, reset) => (
						<ApiErrorFallback
							error={error}
							reset={reset}
							showBackButton={false}
						/>
					)}
				>
					{children}
				</ErrorBoundary>
			</main>


			<BottomNavigation
				currentStep={currentStep}
				steps={bookingSteps as unknown as BookingStep[]}
				setStep={setStep}
			/>

		</div>
	);
}

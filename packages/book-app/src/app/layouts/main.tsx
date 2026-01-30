import { ApiErrorFallback } from "@novahair/ui/api-error-fallback";
import { ErrorBoundary } from "@novahair/ui/error-boundary";
import { BookingStep, bookingSteps } from "../../app";
import { Button } from "@novahair/ui";
import { t } from "i18next";

type MainLayoutProps = {
	children: React.ReactNode;
	currentStep: BookingStep;
	setCurrentStep?: (step: BookingStep) => void;
};

export function MainLayout({ children, currentStep,setCurrentStep }: MainLayoutProps) {
	return (
		<div className="pt-10 grid grid-rows-[auto_1fr] gap-4 max-w-7xl w-full mx-auto">
			<header className="flex gap-1 items-center border rounded-md w-fit">
				{bookingSteps.map((step) => {
					const isDone = bookingSteps.indexOf(step) < bookingSteps.indexOf(currentStep);
					return (<Button
						disabled={!isDone && step !== currentStep}
						key={step}
						onClick={() => setCurrentStep?.(step)}
						size="sm"
						variant={step === currentStep ? "secondary" : "ghost"}
						 
					>
						{t(step)}
					</Button>);	

				})}

			</header>
			<main>
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
		</div>
	);
}

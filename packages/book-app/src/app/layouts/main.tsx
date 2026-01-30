import { ApiErrorFallback } from "@novahair/ui/api-error-fallback";
import { ErrorBoundary } from "@novahair/ui/error-boundary";
import { BookingStep, bookingSteps } from "../../app";
import { Button } from "@novahair/ui";
import { t } from "i18next";
import { BottomNavigation } from "./bottom-navigation";

type MainLayoutProps = {
	children: React.ReactNode;
	currentStep: BookingStep;
	setStep: (step: BookingStep) => void;
};

export function MainLayout({ children, currentStep,setStep }: MainLayoutProps) {
	return (
		<div className="grid grid-rows-[auto_1fr_auto] gap-4 h-full max-w-7xl w-full mx-auto">
			<header>

			<nav className="flex gap-1 items-center border rounded-md w-fit max-md:hidden">
				{bookingSteps.map((step) => {
					const isDone = bookingSteps.indexOf(step) < bookingSteps.indexOf(currentStep);
					return (<Button
						disabled={!isDone && step !== currentStep}
						key={step}
						onClick={() => setStep(step)}
						size="sm"
						variant={step === currentStep ? "secondary" : "ghost"}
						 
						>
						{t(step)}
					</Button>);	
})}
			</nav>
</header>
			<main className="h-full grid flex-1">
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

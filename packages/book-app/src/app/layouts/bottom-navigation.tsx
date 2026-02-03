import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@novahair/ui/button";
import { cn } from "@novahair/utils";
import { BookingStep } from "../../app";

interface BottomNavigationProps {
	currentStep: BookingStep;
 	setStep: (step: BookingStep) => void;
	className?: string;
  steps:BookingStep[];
}

export function BottomNavigation({
	currentStep,
  steps,
  setStep,  
  className,
}: BottomNavigationProps) {
   const totalSteps = steps.length;
  const currentStepIndex = steps.indexOf(currentStep);

	const progress = ((currentStepIndex ) / totalSteps) * 100;

	return (
		<footer className={cn("bg-background border-t border-foreground/20 p-3 md:p-4", className)}>
			{/* Progress Bar */}
			<div className="mb-3 md:mb-4">
				<div className="flex justify-between text-xs md:text-sm text-muted-foreground mb-2">
					<span>Paso {currentStepIndex+1} de {totalSteps}</span>
					<span className="hidden md:inline">{Math.round(progress)}% completado</span>
				</div>
				<div className="w-full bg-muted rounded-full h-1.5 md:h-2">
					<div
						className="bg-primary h-1.5 md:h-2 rounded-full transition-all duration-300"
						style={{ width: `${progress}%` }}
					/>
				</div>
			</div>

			{/* Navigation Buttons */}
			<div className="flex justify-between items-center">
				<Button
					variant="outline"
					onClick={() => setStep(steps[currentStepIndex - 1])}
					disabled={currentStepIndex === 0}
					className="flex items-center gap-1 md:gap-2 h-9 md:h-10 text-xs md:text-sm"
					size="sm"
				>
					<ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
					<span className="hidden sm:inline">Anterior</span>
					<span className="sm:hidden">Atrás</span>
				</Button>


			</div>
		</footer>
	);
}

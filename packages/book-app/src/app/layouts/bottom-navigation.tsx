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
		<footer className={cn("bg-background border-t border-border p-4", className)}>
			{/* Progress Bar */}
			<div className="mb-4">
				<div className="flex justify-between text-sm text-muted-foreground mb-2">
					<span>Paso {currentStepIndex+1} de {totalSteps}</span>
					<span>{Math.round(progress)}% completado</span>
				</div>
				<div className="w-full bg-muted rounded-full h-2">
					<div
						className="bg-primary h-2 rounded-full transition-all duration-300"
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
					className="flex items-center gap-2"
				>
					<ChevronLeft className="w-4 h-4" />
					Anterior
				</Button>

			 
			</div>
		</footer>
	);
}

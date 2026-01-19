import { ArrowLeft, ArrowRight } from "lucide-react";
import { ServiceSwitcher } from "~/features/services/ui/switcher";
import { IconButton } from "./icon-button";

type CalendarNavProps = {
	onPrev?: () => void;
	onNext: () => void;
	showPrev?: boolean;
	prevLabel?: string;
	nextLabel?: string;
};

export const CalendarNav = ({
	onPrev,
	onNext,
	showPrev = true,
	prevLabel = "Anterior",
	nextLabel = "Siguiente",
}: CalendarNavProps) => {
	return (
		<nav className="flex gap-4 items-center">
			<div className="max-md:hidden">
				<ServiceSwitcher />
			</div>
			{showPrev && (
				<IconButton onClick={onPrev} aria-label={prevLabel}>
					<ArrowLeft />
				</IconButton>
			)}

			<IconButton onClick={onNext} aria-label={nextLabel}>
				<ArrowRight />
			</IconButton>
		</nav>
	);
};

export default CalendarNav;

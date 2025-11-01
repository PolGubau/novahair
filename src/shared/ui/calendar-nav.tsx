import { ServiceSwitcher } from "~/features/appointment-form/ui/form/service-switcher";

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
	const buttonClass =
		"bg-primary rounded-full aspect-square size-8 md:size-10 group-focus:size-10 transition-all flex items-center justify-center text-background";
	return (
		<nav className="flex gap-4 items-center">
			<div className="max-md:hidden">
				<ServiceSwitcher />
			</div>
			{showPrev && (
				<button
					type="button"
					onClick={onPrev}
					aria-label={prevLabel}
					className={buttonClass}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						className="rotate-180"
						viewBox="0 -960 960 960"
						width="24px"
						fill="#e3e3e3"
					>
						<title>Arrow Left</title>
						<path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
					</svg>
				</button>
			)}

			<button
				type="button"
				onClick={onNext}
				aria-label={nextLabel}
				className={buttonClass}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24px"
					viewBox="0 -960 960 960"
					width="24px"
					fill="#e3e3e3"
				>
					<title>Arrow Right</title>
					<path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
				</svg>
			</button>
		</nav>
	);
};

export default CalendarNav;

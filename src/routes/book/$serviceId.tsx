import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAvailableDays } from "~/features/appointment-form/model/use-available-days";
import { useCalendarTimes } from "~/features/appointment-form/model/use-calendar-times";
import { Calendar } from "~/features/appointment-form/ui/calendar";
import { AppointmentForm } from "~/features/appointment-form/ui/form/form";
import { Drawer } from "~/shared/ui/drawer";
import { LoadingOverlay } from "~/shared/ui/loading-overlay";

export const Route = createFileRoute("/book/$serviceId")({
	component: CalendarStep,
});

function CalendarStep() {
	const serviceId = Route.useParams().serviceId;
	const {
		goNextMonth,
		formattedDate,
		goPreviousMonth,
		goToday,
		currentDate,
		month,
		year,
	} = useCalendarTimes();

	const { isLoading, error, days } = useAvailableDays({
		serviceId,
		currentDate,
	});

	const [selectedDay, setSelectedDay] = useState<Date | null>(null);

	if (error) return `An error has occurred: ${error.message}`;
	return (
		<main className="min-h-dvh grid grid-rows-[auto_1fr]">
			<Drawer
				isOpen={Boolean(selectedDay)}
				onClose={() => setSelectedDay(null)}
			>
				<section className="p-4">
					<h2 className="text-2xl font-bold mb-4">
						Pide cita el {selectedDay?.toLocaleDateString()}
					</h2>
					<AppointmentForm />
				</section>
			</Drawer>

			<section className="h-full grid gap-10 p-4 ">
				<header className="flex items-center gap-6 text-center justify-between">
					<div className="text-3xl md:text-5xl first-letter:capitalize">
						{formattedDate}
					</div>

					<nav className="flex gap-4 items-center">
						<button
							type="button"
							onClick={goPreviousMonth}
							className="bg-primary rounded-full aspect-square size-10 group-focus:size-10 transition-all flex items-center justify-center text-background"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24px"
								className="rotate-180"
								viewBox="0 -960 960 960"
								width="24px"
								fill="#e3e3e3"
							>
								<title>Arrow Right</title>
								<path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
							</svg>
						</button>

						<button
							type="button"
							onClick={goNextMonth}
							className="bg-primary rounded-full aspect-square size-10 group-focus:size-10 transition-all flex items-center justify-center text-background"
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
				</header>
				<LoadingOverlay isLoading={isLoading}>
					<Calendar
						onSelectDate={setSelectedDay}
						month={month}
						year={year}
						availableDays={days}
					/>
				</LoadingOverlay>
			</section>
		</main>
	);
}

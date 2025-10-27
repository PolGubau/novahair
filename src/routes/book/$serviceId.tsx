import { useAvailableDays } from "@/features/appointment-form/model/use-available-days";
import { useCalendarTimes } from "@/features/appointment-form/model/use-calendar-times";
import { Calendar } from "@/features/appointment-form/ui/calendar";
import { Drawer } from "@/shared/ui/drawer";
import { LoadingOverlay } from "@/shared/ui/loading-overlay";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

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
						Available times for {selectedDay?.toDateString()}
					</h2>
				</section>
			</Drawer>

			<section className="h-full grid gap-4 p-4">
				<nav className="grid grid-cols-3 text-center justify-center gap-4">
					<button
						type="button"
						onClick={goPreviousMonth}
						title="Previous Month"
					>
						&#8249;
					</button>

					<div>
						{formattedDate}
						<button type="button" onClick={goToday}>
							Today
						</button>
					</div>
					<button type="button" onClick={goNextMonth} title="Next Month">
						&#8250;
					</button>
				</nav>
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

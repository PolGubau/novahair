import { createFileRoute } from "@tanstack/react-router";
import { t } from "i18next";
import { useState } from "react";
import { useAvailableDays } from "~/features/appointment-form/model/use-available-days";
import { useCalendarTimes } from "~/features/appointment-form/model/use-calendar-times";
import { Calendar } from "~/features/appointment-form/ui/calendar";
import { CalendarNav } from "~/shared/ui/calendar-nav";
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
	const parsedDate = selectedDay?.toLocaleDateString() ?? "";

	
	return (
		<main className="min-h-dvh grid grid-rows-[auto_1fr]">
			<Drawer
				className="max-w-4xl"
				isOpen={Boolean(selectedDay)}
				onClose={() => setSelectedDay(null)}
			>
				<section className="p-4">
					<h2 className="text-2xl font-bold mb-4">
						{t("appointment_date", {
							date: parsedDate,
						})}
					</h2>

					{selectedDay && <AppointmentForm date={selectedDay}  />}
				</section>
			</Drawer>

			<section className="h-full grid gap-10 p-4 ">
				<header className="flex items-center gap-6 text-center justify-between">
					<div className="text-3xl md:text-5xl first-letter:capitalize">
						{formattedDate}
					</div>

					<CalendarNav
						onPrev={goPreviousMonth}
						onNext={goNextMonth}
						showPrev={
							// Only show previous when the displayed month is after the current month
							(() => {
								const today = new Date();
								return (
									year > today.getFullYear() ||
									(year === today.getFullYear() && month > today.getMonth())
								);
							})()
						}
					/>
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

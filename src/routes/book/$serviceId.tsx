import { createFileRoute } from "@tanstack/react-router";
import confetti from "canvas-confetti";
import { t } from "i18next";
import { useState } from "react";
import { useAvailableDays } from "~/features/appointment-form/model/use-available-days";
import { useCalendarTimes } from "~/features/appointment-form/model/use-calendar-times";
import { useFormValues } from "~/features/appointment-form/model/use-form-values";
import { Calendar } from "~/features/appointment-form/ui/calendar";
import {
	AppointmentForm,
	type FormValue,
} from "~/features/appointment-form/ui/form/form";
import { ServiceSwitcher } from "~/features/appointment-form/ui/form/service-switcher";
import { SuccessAppointment } from "~/features/appointment-form/ui/success-appointment";
import { CalendarNav } from "~/shared/ui/calendar-nav";
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
	const [isSuccessfullySent, setIsSuccessfullySent] = useState(false);
	const { fields } = useFormValues<FormValue>();

	const triggerConfetti = () => {
		const end = Date.now() + 2 * 1000; // 2 seconds
		const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];
		const frame = () => {
			if (Date.now() > end) return;
			confetti({
				particleCount: 2,
				angle: 60,
				spread: 55,
				startVelocity: 60,
				origin: { x: 0, y: 0.5 },
				colors: colors,
			});
			confetti({
				particleCount: 2,
				angle: 120,
				spread: 55,
				startVelocity: 60,
				origin: { x: 1, y: 0.5 },
				colors: colors,
			});
			requestAnimationFrame(frame);
		};
		frame();
	};

	if (error) return `An error has occurred: ${error.message}`;
	const parsedDate = selectedDay?.toLocaleDateString() ?? "";

	const handleCloseDialog = () => {
		setSelectedDay(null);
		setIsSuccessfullySent(false);
	};
	return (
		<main className="min-h-dvh grid grid-rows-[auto_1fr]">
			<Drawer
				className="max-w-4xl"
				isOpen={Boolean(selectedDay)}
				onClose={handleCloseDialog}
			>
				<section className="p-4">
					{!isSuccessfullySent ? (
						selectedDay && (
							<>
								<h2 className="text-2xl font-bold mb-4">
									{t("appointment_date", {
										date: parsedDate,
									})}
								</h2>

								<AppointmentForm
									date={selectedDay}
									onSuccess={() => {
										triggerConfetti();
										setIsSuccessfullySent(true);
									}}
								/>
							</>
						)
					) : (
						<SuccessAppointment
							date={parsedDate}
							email={fields.email}
							onCloseDialog={handleCloseDialog}
						/>
					)}
				</section>
			</Drawer>

			<section className="h-full grid gap-2">
				<div className="md:hidden px-4">
					<ServiceSwitcher />
				</div>
				<header className="flex md:items-center md:gap-6 md:text-center justify-between px-4">
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

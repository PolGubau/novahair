import { createFileRoute } from "@tanstack/react-router";
import confetti from "canvas-confetti";
import { t } from "i18next";
import { useState } from "react";
import { useAvailableDays } from "~/features/appointment-form/model/use-available-days";
import { useCalendarTimes } from "~/features/appointment-form/model/use-calendar-times";
import { useFormValues } from "~/features/appointment-form/model/use-form-values";
import { Calendar, cellStyles } from "~/features/appointment-form/ui/calendar";
import {
	AppointmentForm,
	type FormValue,
} from "~/features/appointment-form/ui/form/form";
import { ServiceSwitcher } from "~/features/appointment-form/ui/form/service-switcher";
import { SuccessAppointment } from "~/features/appointment-form/ui/success-appointment";
import { cn } from "~/lib/cn";
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
		const end = Date.now() + 1 * 1000; // 1 second
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
				classNames={{
					header: "md:px-8 pt-6",
					body: "p-0",
				}}
				open={Boolean(selectedDay)}
				onClose={handleCloseDialog}
				header={
					<div className="border-foreground/10">
						<h2 className="text-lg md:text-2xl font-medium">
							{t("appointment_date", {
								date: parsedDate,
							})}
						</h2>
					</div>
				}
			>
				<section className="">
					{!isSuccessfullySent ? (
						selectedDay && (
							<AppointmentForm
								date={selectedDay}
								onSuccess={() => {
									triggerConfetti();
									setIsSuccessfullySent(true);
								}}
							/>
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
					<div className="text-2xl md:text-4xl xl:text-5xl first-letter:capitalize">
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
				<ul className="flex gap-2 md:gap-6 px-4 md:px-0 max-md:flex-col">
					<li className="flex gap-2 items-center">
						<div
							className={cn("size-4 rounded-full border", cellStyles.available)}
						></div>
						{t("available")}
					</li>
					<li className="flex gap-2 items-center">
						<div
							className={cn(
								"size-4 rounded-full border",
								cellStyles.unavailable,
							)}
						></div>
						{t("no_available_hours")}
					</li>
				</ul>
			</section>
		</main>
	);
}

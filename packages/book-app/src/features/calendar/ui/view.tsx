import { useAvailableDays } from "@novahair/client";
import { Drawer } from "@novahair/ui/drawer";
import { LoadingOverlay } from "@novahair/ui/loading-overlay";
import { TranslationKey } from "@novahair/utils";
import { cn } from "@novahair/utils/lib/cn";
import confetti from "canvas-confetti";
import { t } from "i18next";
import { useState } from "react";
import i18n from "../../../shared/i18n/setup";
import { useTenantId } from "../../../shared/tenant";
import { CalendarNav } from "../../../shared/ui/calendar-nav";
import { useCalendarTimes } from "../../appointment-form/hooks/use-calendar-times";
import { Calendar, cellStyles } from "../../appointment-form/ui/calendar";
import { AppointmentForm } from "../../appointment-form/ui/form/form";
import { SuccessAppointment } from "../../appointment-form/ui/success-appointment";
import { getMonthBoundaries } from "../../appointment-form/utils/get-month-boundaries";
 
 

function getLabelledDate(date: Date,locale?: string) {
	return new Intl.DateTimeFormat(locale, {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	}).format(date);
}
type CalendarStepProps = {
  serviceId: string;
  staffId: string;
  setSelectedServiceId: (id?: string) => void;
  setSelectedStaffId: (id?: string) => void;
 };

export function CalendarStep({ serviceId, staffId, setSelectedServiceId, setSelectedStaffId }: CalendarStepProps) {
	
 const [selectedDayISO, setSelectedDayISO] = useState<string | undefined>(undefined);
	const tenantId = useTenantId();
	const {
		goNextMonth,
		formattedDate,
		goPreviousMonth,
		currentDate,
		month,
		year,
	} = useCalendarTimes();
	const { startIso, endIso } = getMonthBoundaries(currentDate);

	const { isLoading, error, days, refetch } = useAvailableDays({
		serviceId,
		tenantId,
		from: startIso,
		staffId,
		to: endIso,
	});


	const [isSuccessfullySent, setIsSuccessfullySent] = useState(false);
	const [submittedEmail, setSubmittedEmail] = useState<string>("");

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
			})
			confetti({
				particleCount: 2,
				angle: 120,
				spread: 55,
				startVelocity: 60,
				origin: { x: 1, y: 0.5 },
				colors: colors,
			})
			requestAnimationFrame(frame);
		}
		frame();
	}

	if (error) return `An error has occurred: ${error.message}`;
	const selectedDay = selectedDayISO ? new Date(selectedDayISO) : null;


	const parsedDate = selectedDay ? getLabelledDate(selectedDay,i18n.language) : "";


	const handleCloseDialog = () => {
		refetch();
		setSelectedDayISO(undefined);
		setIsSuccessfullySent(false);
	}
	function setSelectedDay(date: Date) {
		setSelectedDayISO(date.toISOString());
	}

	return (
		<main className="grid grid-rows-[auto_1fr]">
			<Drawer
				className="max-w-4xl"
				classNames={{
					header: "md:px-8 pt-6",
					body: "p-0",
				}}
				open={Boolean(selectedDayISO)}
				onClose={handleCloseDialog}
				title={t("appointment_date", {
					date: parsedDate,
				}) as TranslationKey}
				 
			>
				<section className="">
					{!isSuccessfullySent ? (
						selectedDay && (
							<AppointmentForm
								date={selectedDay}
								initialStaffId={staffId}
								onSuccess={({ email }) => {
									triggerConfetti()
									setIsSuccessfullySent(true);
									setSubmittedEmail(email)
								}}
							/>
						)
					) : (
						<SuccessAppointment
							date={parsedDate}
							email={submittedEmail}
							onCloseDialog={handleCloseDialog}
						/>
					)}
				</section>
			</Drawer>

			<section className="h-full grid gap-2 md:gap-8">
				 
				<header className="flex md:items-center md:gap-6 md:text-center justify-between px-4">
					<div className="text-2xl md:text-4xl xl:text-5xl first-letter:capitalize">
						{formattedDate}
					</div>

					<CalendarNav 
						staffId={staffId}
						serviceId={serviceId}
						setStaffId={(id) => setSelectedStaffId(id)}
						setServiceId={(id) => setSelectedServiceId(id)}
						onPrev={goPreviousMonth}
						onNext={goNextMonth}
						showPrev={
							// Only show previous when the displayed month is after the current month
							(() => {
								const today = new Date();
								return (
									year > today.getFullYear() ||
									(year === today.getFullYear() && month > today.getMonth())
								)
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
						/>
						{t("available")}
					</li>
					<li className="flex gap-2 items-center">
						<div
							className={cn(
								"size-4 rounded-full border",
								cellStyles.unavailable,
							)}
						/>
						{t("no_available_hours")}
					</li>
				</ul>
			</section>
		</main>
	)
}

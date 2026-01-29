import { Button } from "@novahair/ui/button";
import { LoadingOverlay } from "@novahair/ui/loading-overlay";
import { Link } from "@tanstack/react-router";
import { t } from "i18next";
import { useState } from "react";
import { useCancelAppointment } from "../hooks/use-cancel-appointment";

type Props = {
	appointmentId: string;
};

export const CancelAppointmentForm = ({ appointmentId }: Props) => {
 	const { appointment, formattedDate, isLoading, error, cancelAppointment, isCancelling } = useCancelAppointment(appointmentId);
	const [isCancelled, setIsCancelled] = useState(false);

	const handleCancel = () => {
		cancelAppointment(() => setIsCancelled(true));
	};
 

	if (error) {
		return (
			<section className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
				<p className="text-red-500">{t("error_loading_appointment")}</p>
			</section>
		);
	}

	if (isCancelled) {
		return (
			<section className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
				<h1 className="text-2xl font-bold">{t("appointment_cancelled")}</h1>
				<p>{t("appointment_cancelled_message")}</p>
				<Link to="/">
					<Button>
						{t("go_home")}
					</Button>
				</Link>
			</section>
		);
	}

	return (
		<LoadingOverlay isLoading={isLoading}>
			<section className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
				<h1 className="text-2xl font-bold">{t("cancel_appointment")}</h1>
				{appointment && (
					<div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
						<h2 className="text-lg font-semibold mb-4">{t("appointment_details")}</h2>
						<div className="space-y-2">
							<p><strong>{t("date")}:</strong> {formattedDate}</p>
							<p><strong>{t("service")}:</strong> {appointment.service?.name}</p>
							<p><strong>{t("staff")}:</strong> {appointment.staff?.name}</p>
						</div>
					</div>
				)}
				<p>{t("cancel_appointment_confirmation")}</p>
				<Button onClick={handleCancel} disabled={isCancelling}>
					{isCancelling ? t("cancelling") : t("confirm_cancel")}
				</Button>
			</section>
		</LoadingOverlay>
	);
};
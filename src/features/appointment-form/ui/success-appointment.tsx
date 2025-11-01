import { t } from "i18next";

type SuccessAppointmentProps = {
	date: string;
	email: string;
};
export const SuccessAppointment = ({
	date,
	email,
}: SuccessAppointmentProps) => {
	return (
		<div className="flex flex-col justify-center ">
			<h2 className="text-2xl font-bold mb-4">
				{t("your_appointment_created_at", { datetime: date })}
			</h2>

			<p>{t("we_sent_email_confirmation", { email })}</p>
		</div>
	);
};

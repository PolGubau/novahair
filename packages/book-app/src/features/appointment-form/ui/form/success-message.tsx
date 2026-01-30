import type { Appointment } from "@novahair/client";
import { t } from "i18next";

type Props = {
	appointment: Appointment;
};

export const SuccessMessage = ({ appointment }: Props) => {
	const datetime = new Date(appointment.startsAt).toLocaleString();
	const detailsDefault = `${appointment.customer.name} — ${datetime}`;

	return (
		<div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
			<h3 className="font-semibold">{t("appointment_created_title")}</h3>
			<p className="text-sm">
				{t("appointment_created_details", detailsDefault)}
			</p>
			<pre className="text-xs mt-2 whitespace-pre-wrap">
				{JSON.stringify(appointment, null, 2)}
			</pre>
		</div>
	);
};

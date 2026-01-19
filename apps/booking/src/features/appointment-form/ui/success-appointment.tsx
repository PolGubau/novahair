import { Link } from "@tanstack/react-router";
import { t } from "i18next";
import { Button } from "@novahair/ui/button";

type SuccessAppointmentProps = {
	date: string;
	email: string;
	onCloseDialog: () => void;
};
export const SuccessAppointment = ({
	date,
	email,
	onCloseDialog,
}: SuccessAppointmentProps) => {
	return (
		<section className="flex flex-col justify-center gap-6 p-4 md:p-8">
			<header className="flex flex-col justify-center gap-1">
				<h2 className="text-2xl font-bold">
					{t("your_appointment_created_at", { datetime: date })}
				</h2>
				<p>{t("we_sent_email_confirmation", { email })}</p>
			</header>
			<nav className="flex gap-2 items-center">
				<Link to="/">
					<Button>{t("go_back_home")}</Button>
				</Link>
				<Button variant={"outline"} onClick={onCloseDialog}>
					{t("book_another_appointment")}
				</Button>
			</nav>
		</section>
	);
};

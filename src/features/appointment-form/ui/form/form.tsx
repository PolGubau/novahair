import { t } from "i18next";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSubmitAppointment } from "~/features/appointment-form/model/use-submit-appointment";
import { Route } from "~/routes/book/$serviceId";
import { Button } from "~/shared/ui/button";
import { Input } from "~/shared/ui/input";
import { Textarea } from "~/shared/ui/textarea";
import { ErrorMessage } from "./ErrorMessage";
import { SuccessMessage } from "./SuccessMessage";
import { SlotChooser } from "./slot-chooser";

type AppointmentFormProps = {
	date: Date;
	staffId?: string;
};

export const AppointmentForm = ({ date, staffId }: AppointmentFormProps) => {
	const [chosenSlot, setChosenSlot] = useState<{
		start: string;
		end: string;
	} | null>(null);
	const formRef = useRef<HTMLFormElement | null>(null);

	const serviceId = Route.useParams().serviceId;

	const { isLoading, error, handleSubmit, isSuccess, createdAppointment } =
		useSubmitAppointment(serviceId ? { serviceId, staffId } : null);

	useEffect(() => {
		if (isSuccess) {
			formRef.current?.reset();
		}
	}, [isSuccess]);

	return (
		<form
			ref={formRef}
			className="flex flex-col gap-4"
			onSubmit={(e) => {
				if (!chosenSlot) {
					console.warn("No slot chosen");
					return;
				}

				handleSubmit(e, chosenSlot.start, chosenSlot.end);
			}}
		>
			<Input
				label={t("name")}
				placeholder={t("name_placeholder")}
				name={"name"}
			/>
			<Input
				label={t("email")}
				placeholder={t("email_placeholder")}
				name="email"
			/>
			<Input label={t("phone")} placeholder="600 123 456" name="phone" />

			<SlotChooser
				date={date}
				staffId={staffId}
				selectedSlot={chosenSlot || undefined}
				onChange={setChosenSlot}
			/>
			<Textarea
				label={t("notes")}
				placeholder={t("notes_placeholder")}
				name="notes"
			/>

			<Button type="submit" className="mt-6" disabled={isLoading}>
				{t("book_appointment")}
				<Send className="size-4" />
			</Button>

			{error && <ErrorMessage error={error} />}

			{isSuccess && createdAppointment && (
				<SuccessMessage appointment={createdAppointment} />
			)}
		</form>
	);
};

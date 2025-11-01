import { t } from "i18next";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSubmitAppointment } from "~/features/appointment-form/model/use-submit-appointment";
import { Route } from "~/routes/book/$serviceId";
import { Button } from "~/shared/ui/button";
import { Input } from "~/shared/ui/input";
import { Textarea } from "~/shared/ui/textarea";
import { useFormValues } from "../../model/use-form-values";
import { ErrorMessage } from "./error-message";
import { SlotChooser } from "./slot-chooser";
import { SuccessMessage } from "./success-message";

type AppointmentFormProps = {
	date: Date;
	onSuccess: () => void;
};

export type FormValue = {
	name: string;
	email: string;
	phone: string;
	notes?: string;
};

export const AppointmentForm = ({ date, onSuccess }: AppointmentFormProps) => {
	const { fields, updateField } = useFormValues<FormValue>();

	const staffId = "7ff1d62e-7188-4e93-b7c6-ac7ca9cc7d25";
	const [chosenSlot, setChosenSlot] = useState<{
		start: string;
		end: string;
	} | null>(null);

	const formRef = useRef<HTMLFormElement | null>(null);

	const serviceId = Route.useParams().serviceId;

	const { isLoading, error, handleSubmit, isSuccess, createdAppointment } =
		useSubmitAppointment({
			serviceId,
			staffId,
			onSuccess,
		});

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
			<SlotChooser
				date={date}
				staffId={staffId}
				selectedSlot={chosenSlot || undefined}
				onChange={setChosenSlot}
			/>
			<hr className="my-4" />
			<Input
				label={t("name")}
				placeholder={t("name_placeholder")}
				name={"name"}
				required
				value={fields.name}
				onChange={(e) => updateField("name", e.target.value)}
				minLength={2}
			/>

			<Input
				label={t("phone")}
				value={fields.phone}
				onChange={(e) => updateField("phone", e.target.value)}
				placeholder="123 456 789"
				name="phone"
				type="tel"
			/>

			<Input
				label={t("email")}
				placeholder={t("email_placeholder")}
				name="email"
				type="email"
				value={fields.email}
				onChange={(e) => updateField("email", e.target.value)}
				required
				minLength={5}
			/>

			<Textarea
				label={t("notes")}
				placeholder={t("notes_placeholder")}
				name="notes"
				className="min-h-18 max-h-96"
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

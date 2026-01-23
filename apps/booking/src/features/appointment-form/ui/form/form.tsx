import type { AvailabilitySlot } from "@novahair/client";
import { Button } from "@novahair/ui/button";
import { Input } from "@novahair/ui/input";
import { Textarea } from "@novahair/ui/textarea";
import { t } from "i18next";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSubmitAppointment } from "~/features/appointment-form/hooks/use-submit-appointment";
import { Route } from "~/routes/$serviceId";
import { useFormValues } from "../../hooks/use-form-values";
import { ErrorMessage } from "./error-message";
import { SlotChooser } from "./slots/slot-chooser";
import { StaffSelector } from "./staff/list";

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

	const [chosenSlot, setChosenSlot] = useState<AvailabilitySlot | null>(null);

	const [staffId, setStaffId] = useState<string | null>(null);
	const formRef = useRef<HTMLFormElement | null>(null);

	const serviceId = Route.useParams().serviceId;

	const { isLoading, error, handleSubmit, isSuccess } = useSubmitAppointment({
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

				handleSubmit(e, chosenSlot.start);
			}}
		>
			<section className="flex flex-col px-4 md:px-8 gap-4">
				<SlotChooser
					date={date}
					staffId={staffId}
					selectedSlot={chosenSlot}
					onChange={setChosenSlot}
				/>
				<StaffSelector
					staffs={chosenSlot?.staff ?? []}
					selectedStaffId={staffId}
					onSelectStaff={setStaffId}
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
				<div className="grid gap-4 md:grid-cols-2">
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
					<Input
						label={t("phone")}
						value={fields.phone}
						onChange={(e) => updateField("phone", e.target.value)}
						placeholder="123 456 789"
						name="phone"
						type="tel"
					/>
				</div>
				<Textarea
					label={t("notes")}
					placeholder={t("notes_placeholder")}
					name="notes"
					className="min-h-18 max-h-96"
				/>
			</section>
			<nav className="sticky bottom-0 p-4 md:p-8 bg-background/50 backdrop-blur-sm justify-end flex rounded-xl">
				<Button
					loading={isLoading}
					type="submit"
					disabled={isLoading || !chosenSlot}
				>
					{t("book_appointment")}
					<Send className="size-4" />
				</Button>
				{error && <ErrorMessage error={error} />}
			</nav>
		</form>
	);
};

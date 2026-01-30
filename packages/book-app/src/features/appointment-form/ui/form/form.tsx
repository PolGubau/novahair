import type { AvailabilitySlot } from "@novahair/client";
import { Button } from "@novahair/ui/button";
import { Input } from "@novahair/ui/input";
import { Textarea } from "@novahair/ui/textarea";
import { t } from "i18next";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFormValues } from "../../hooks/use-form-values";
import { useSubmitAppointment } from "../../hooks/use-submit-appointment";
import { ErrorMessage } from "./error-message";
import { SlotChooser } from "./slots/slot-chooser";
import { StaffSelector } from "./staff/list";

type AppointmentFormProps = {
	date: Date;
	serviceId: string;
	onSuccess: (data:FormValue) => void;
	initialStaffId?: string | null;
};

export type FormValue = {
	name: string;
	email: string;
	phone: string;
	notes?: string;
};

export const AppointmentForm = ({ date, serviceId, onSuccess, initialStaffId }: AppointmentFormProps) => {
	const { fields, updateField } = useFormValues<FormValue>();

	const [chosenSlot, setChosenSlot] = useState<AvailabilitySlot | null>(null);

	const [staffId, setStaffId] = useState<string | null>(initialStaffId ?? null);
	const formRef = useRef<HTMLFormElement | null>(null);

 
	const { isLoading, error, handleSubmit, isSuccess } = useSubmitAppointment({
		serviceId,
		staffId,
		onSuccess: () => {
			onSuccess(fields);
		},
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
					serviceId={serviceId}
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
			{error &&
				<div className="px-4 md:px-8">
					<ErrorMessage error={error} />
				</div>
			}
				
			<nav className="sticky bottom-0 p-4 md:p-8 bg-background/50 backdrop-blur-sm justify-end flex rounded-xl">
				<Button
					loading={isLoading}
					type="submit"
					disabled={isLoading || !chosenSlot}
				>
					{t("book_appointment")}
					<Send className="size-4" />
				</Button>
			</nav>
		</form>
	);
};

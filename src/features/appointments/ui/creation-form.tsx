import { t } from "i18next";
import { useEffect, useState } from "react";
import { useServices } from "~/features/services/model/use-services";
import { useStaffs } from "~/features/staff/models/use-staffs";
import type { TranslationKey } from "~/shared/i18n/setup";
import { Button } from "~/shared/ui/button";
import { Input } from "~/shared/ui/input";
import { Select } from "~/shared/ui/select";
import { Textarea } from "~/shared/ui/textarea";
import type { Appointment } from "../domain/appointments";
import { appointmentFormRepository } from "../infra/repository";

export const AppointmentCreationForm = ({
	appointment,
	onClose,
}: {
	appointment?: Appointment | null;
	onClose?: () => void;
}) => {
	const isEdit = Boolean(appointment);
	const { services } = useServices();
	const { staffs } = useStaffs();

	const [values, setValues] = useState({
		serviceId: appointment?.serviceId ?? "",
		staffId: appointment?.staffId ?? "",
		customerName: appointment?.customer.name ?? "",
		customerEmail: appointment?.customer.email ?? "",
		customerPhone: appointment?.customer.phone ?? "",
		startsAt: appointment?.startsAt ?? "",
		notes: appointment?.notes ?? "",
	});

	function handleChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) {
		const { name, value } = e.target;
		setValues((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	const handleSelectChange = (name: string, value: string) => {
		setValues((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const {
		serviceId,
		staffId,
		customerName,
		customerEmail,
		customerPhone,
		startsAt,
		notes,
	} = values;

	useEffect(() => {
		if (appointment) {
			setValues({
				serviceId: appointment.serviceId,
				staffId: appointment.staffId ?? "",
				customerName: appointment.customer.name,
				customerEmail: appointment.customer.email,
				customerPhone: appointment.customer.phone,
				startsAt: appointment.startsAt,
				notes: appointment.notes,
			});
		}
	}, [appointment]);

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const newAppointment: Appointment = {
			serviceId,
			staffId: staffId || undefined,
			customer: {
				name: customerName,
				email: customerEmail,
				phone: customerPhone,
			},
			startsAt,
			notes,
		};

		appointmentFormRepository.saveLocal(newAppointment);
		onClose?.();
		window.location.reload();
	};

	return (
		<form onSubmit={onSubmit} className="grid gap-4">
			<Select
				label={"select_service"}
				required
				onChange={(value) => handleSelectChange("serviceId", value)}
				options={services.map((s) => ({
					label: s.name as TranslationKey,
					value: s.id,
				}))}
				value={serviceId}
			/>

			<Select
				label={"select_staff"}
				value={staffId || undefined}
				onChange={(value) => handleSelectChange("staffId", value)}
				options={staffs.map((s) => ({
					label: s.name as TranslationKey,
					value: s.id,
				}))}
			/>
			<Input
				label={t("name")}
				value={customerName}
				name="customerName"
				placeholder={t("name_placeholder")}
				required
				onChange={handleChange}
			/>

			<Input
				label={t("email")}
				value={customerEmail}
				name="customerEmail"
				type="email"
				placeholder={t("email_placeholder")}
				required
				onChange={handleChange}
			/>

			<Input
				label={t("phone")}
				value={customerPhone}
				name="customerPhone"
				type="tel"
				placeholder={t("staff_phone_placeholder")}
				required
				onChange={handleChange}
			/>

			<Input
				label={t("appointment_date")}
				value={startsAt}
				name="startsAt"
				type="datetime-local"
				required
				onChange={handleChange}
			/>

			<Textarea
				placeholder={t("notes_placeholder")}
				label={t("notes")}
				name="notes"
				value={notes ?? ""}
				onChange={handleChange}
			/>

			<div className="flex gap-2 justify-end">
				<Button variant="outline" type="button" onClick={() => onClose?.()}>
					{t("cancel")}
				</Button>
				<Button type="submit">{isEdit ? t("save") : t("create")}</Button>
			</div>
		</form>
	);
};

export default AppointmentCreationForm;

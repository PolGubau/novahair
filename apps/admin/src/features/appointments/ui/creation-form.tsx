import { useServices, useStaffs } from "@novahair/client";
import { Button } from "@novahair/ui/button";
import { ErrorBoundary } from "@novahair/ui/error-boundary";
import { Input } from "@novahair/ui/input";
import { Select } from "@novahair/ui/select";
import { Textarea } from "@novahair/ui/textarea";
import { config } from "@novahair/utils";
import type { TranslationKey } from "@novahair/utils/i18n/types";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import type { SummarizedAppointment } from "../domain/summarized-appointments";
import { appointmentRepository } from "../infra/repository";

export const AppointmentCreationForm = ({
	appointment,
	onClose,
}: {
	appointment?: SummarizedAppointment | null;
	onClose?: () => void;
}) => {
	const { t } = useTranslation();
	const isEdit = Boolean(appointment);
	const { services } = useServices(config.tenantId);
	const { staffs } = useStaffs(config.tenantId);

	const [values, setValues] = useState({
		customerEmail: appointment?.customer.email ?? "",
		customerName: appointment?.customer.name ?? "",
		customerPhone: appointment?.customer.phone ?? "",
		notes: appointment?.notes ?? undefined,
		serviceId: appointment?.serviceId ?? "",
		staffId: appointment?.staffId ?? "",
		startsAt: appointment?.startsAt ?? "",
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
				customerEmail: appointment.customer.email,
				customerName: appointment.customer.name,
				customerPhone: appointment.customer.phone,
				notes: appointment.notes,
				serviceId: appointment.serviceId,
				staffId: appointment.staffId ?? "",
				startsAt: appointment.startsAt,
			});
		}
	}, [appointment]);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const newAppointment = {
			customer: {
				email: customerEmail,
				name: customerName,
				phone: customerPhone,
			},
			notes,
			serviceId,
			staffId: staffId || undefined,
			startsAt,
		};

		try {
			await appointmentRepository.create(newAppointment);
			onClose?.();
			window.location.reload();
		} catch (error) {
			console.error("Error creating appointment:", error);
			// TODO: Mostrar error al usuario
		}
	};

	return (
		<ErrorBoundary>
			<form className="grid gap-4" onSubmit={onSubmit}>
				<fieldset className="grid gap-4 border-b pb-4 md:grid-cols-2">
					<Select
						label={"select_service"}
						onChange={(value) => handleSelectChange("serviceId", value)}
						options={services.map((s) => ({
							label: s.name as TranslationKey,
							value: s.id,
						}))}
						required
						value={serviceId}
					/>

					<Select
						label={"select_staff"}
						onChange={(value) => handleSelectChange("staffId", value)}
						options={staffs.map((s) => ({
							label: s.name as TranslationKey,
							value: s.id,
						}))}
						value={staffId || undefined}
					/>
				</fieldset>

				<Input
					label={t("name")}
					name="customerName"
					onChange={handleChange}
					placeholder={t("name_placeholder")}
					required
					value={customerName}
				/>

				<Input
					label={t("email")}
					name="customerEmail"
					onChange={handleChange}
					placeholder={t("email_placeholder")}
					required
					type="email"
					value={customerEmail}
				/>

				<Input
					label={t("phone")}
					name="customerPhone"
					onChange={handleChange}
					placeholder={t("staff_phone_placeholder")}
					required
					type="tel"
					value={customerPhone}
				/>

				<Input
					label={t("appointment_date")}
					name="startsAt"
					onChange={handleChange}
					required
					type="datetime-local"
					value={startsAt}
				/>

				<Textarea
					label={t("notes")}
					name="notes"
					onChange={handleChange}
					placeholder={t("notes_placeholder")}
					value={notes ?? ""}
				/>

				<div className="flex gap-2 justify-end">
					<Button onClick={() => onClose?.()} variant="outline">
						{t("cancel")}
					</Button>
					<Button type="submit">{isEdit ? t("save") : t("create")}</Button>
				</div>
			</form>
		</ErrorBoundary>
	);
};

export default AppointmentCreationForm;

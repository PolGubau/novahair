import { useServices, useStaffs } from "@novahair/client";
import { Button } from "@novahair/ui/button";
import { ErrorBoundary } from "@novahair/ui/error-boundary";
import { Input } from "@novahair/ui/input";
import { Select } from "@novahair/ui/select";
import { Textarea } from "@novahair/ui/textarea";
import { config } from "@novahair/utils";
import type { TranslationKey } from "@novahair/utils/i18n/setup";
import { t } from "i18next";
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
	const isEdit = Boolean(appointment);
	const { services } = useServices(config.tenantId);
	const { staffs } = useStaffs(config.tenantId);

	const [values, setValues] = useState({
		serviceId: appointment?.serviceId ?? "",
		staffId: appointment?.staffId ?? "",
		customerName: appointment?.customer.name ?? "",
		customerEmail: appointment?.customer.email ?? "",
		customerPhone: appointment?.customer.phone ?? "",
		startsAt: appointment?.startsAt ?? "",
		notes: appointment?.notes ?? undefined,
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

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const newAppointment = {
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
			<form onSubmit={onSubmit} className="grid gap-4">
				<fieldset className="grid gap-4 border-b pb-4 md:grid-cols-2">
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
				</fieldset>

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
		</ErrorBoundary>
	);
};

export default AppointmentCreationForm;

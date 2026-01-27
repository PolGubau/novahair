import { type Appointment, useServices, useStaffs } from "@novahair/client";
import { Button } from "@novahair/ui/button";
import { Input } from "@novahair/ui/input";
import { Select } from "@novahair/ui/select";
import { Textarea } from "@novahair/ui/textarea";
import type { TranslationKey } from "@novahair/utils/i18n/types";

import { t } from "i18next";
import { useEffect, useState } from "react";
import { useTenantId } from "~/shared/tenant";

export const AppointmentCreationForm = ({
	appointment,
	onClose,
}: {
	appointment?: Appointment | null;
	onClose?: () => void;
}) => {
	const isEdit = Boolean(appointment);
	const tenantId = useTenantId();
	const { services } = useServices(tenantId);
	const { staffs } = useStaffs(tenantId);

	const [values, setValues] = useState({
		serviceId: appointment?.service.id ?? "",
		staffId: appointment?.staff.id ?? "",
		customerName: appointment?.customer.name ?? "",
		customerEmail: appointment?.customer.email ?? "",
		customerPhone: appointment?.customer.phone ?? "",
		startsAt: appointment?.startAt ?? "",
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
				serviceId: appointment.service.id,
				staffId: appointment.staff.id ?? "",
				customerName: appointment.customer.name,
				customerEmail: appointment.customer.email,
				customerPhone: appointment.customer.phone,
				startsAt: appointment.startAt,
				notes: appointment.notes ?? undefined,
			});
		}
	}, [appointment]);

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		onClose?.();
		window.location.reload();
	};

	return (
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
	);
};

export default AppointmentCreationForm;

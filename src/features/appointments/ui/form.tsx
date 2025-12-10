import { t } from "i18next";
import { useStaff } from "~/features/staff/models/use-staff";
import { Button } from "~/shared/ui/button";
import { Input } from "~/shared/ui/input";
import type { Appointment } from "../domain/appointments";

export const AppointmentForm = ({
	appointment,
	onClose,
}: {
	appointment?: Appointment | null;
	onClose?: () => void;
}) => {
	const isEdit = Boolean(appointment);
	const { create, update } = useStaff();

	const saving = create.isPending || update.isPending;

	return (
		<form className="grid gap-4">
			<div>
				<Input
					label={t("name")}
					name="name"
					placeholder={t("staff_name_placeholder")}
					required
				/>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div>
					<Input
						placeholder={t("staff_email_placeholder")}
						required
						type="text"
						label={t("email")}
						name="email"
					/>
				</div>
				<div>
					<Input
						label={t("phone")}
						placeholder={t("staff_phone_placeholder")}
						type="tel"
						required
						name="phone"
					/>
				</div>
			</div>
			<div>
				<Input label={t("color")} name="color" type="color" />
			</div>

			<div className="flex gap-2 justify-end">
				<Button
					variant="outline"
					type="button"
					onClick={() => onClose?.()}
					disabled={saving}
				>
					{t("cancel")}
				</Button>
				<Button type="submit" disabled={saving} loading={saving}>
					{isEdit ? t("save") : t("create")}
				</Button>
			</div>
		</form>
	);
};

import { useStaffActions } from "@novahair/client";
import { Button } from "@novahair/ui/button";
import { ErrorBoundary } from "@novahair/ui/error-boundary";
import { Input } from "@novahair/ui/input";
import { useTranslation } from "react-i18next";
import type { SummarizedAppointment } from "../domain/summarized-appointments";

export const AppointmentForm = ({
	appointment,
	onClose,
}: {
	appointment?: SummarizedAppointment | null;
	onClose?: () => void;
}) => {
	const { t } = useTranslation();
	const isEdit = Boolean(appointment);
	const { create, update } = useStaffActions();

	const saving = create.isPending || update.isPending;

	return (
		<ErrorBoundary>
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
							label={t("email")}
							name="email"
							placeholder={t("staff_email_placeholder")}
							required
							type="text"
						/>
					</div>
					<div>
						<Input
							label={t("phone")}
							name="phone"
							placeholder={t("staff_phone_placeholder")}
							required
							type="tel"
						/>
					</div>
				</div>
				<div>
					<Input label={t("color")} name="color" type="color" />
				</div>

				<div className="flex gap-2 justify-end">
					<Button
						disabled={saving}
						onClick={() => onClose?.()}
						type="button"
						variant="outline"
					>
						{t("cancel")}
					</Button>
					<Button disabled={saving} loading={saving} type="submit">
						{isEdit ? t("save") : t("create")}
					</Button>
				</div>
			</form>
		</ErrorBoundary>
	);
};

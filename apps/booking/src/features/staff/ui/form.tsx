import { type Staff, type StaffCreate, useStaff } from "@novahair/client";
import { Button } from "@novahair/ui/button";
import { Input } from "@novahair/ui/input";
import { t } from "i18next";
import { useEffect, useState } from "react";

export const StaffForm = ({
	staff,
	onClose,
}: {
	staff?: Staff | null;
	onClose?: () => void;
}) => {
	const isEdit = Boolean(staff);
	const { create, update } = useStaff();

	const [values, setValues] = useState<StaffCreate>({
		name: staff?.name ?? "",
		color: staff?.color ?? "",
		email: staff?.email ?? "",
		phone: staff?.phone ?? "",
		avatarUrl: staff?.avatarUrl ?? "",
	});

	function handleChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) {
		const { name, value } = e.target;
		setValues((prev) => ({
			...prev,
			[name]:
				name === "priceCents" || name === "durationMin" ? Number(value) : value,
		}));
	}

	const { name, email, phone, color, avatarUrl } = values;

	useEffect(() => {
		if (staff) {
			setValues({
				name: staff.name,
				email: staff.email ?? "",
				phone: staff.phone ?? "",
				color: staff.color ?? "",
				avatarUrl: staff.avatarUrl ?? "",
			});
		}
	}, [staff]);

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const payload: StaffCreate = {
			name,
			email,
			phone,
			color,
			avatarUrl,
		};

		if (isEdit && staff) {
			update.mutate(
				{ id: staff.id, payload },
				{ onSuccess: () => onClose?.() },
			);
		} else {
			create.mutate(payload, { onSuccess: () => onClose?.() });
		}
	};

	const saving = create.isPending || update.isPending;

	return (
		<form onSubmit={onSubmit} className="grid gap-4">
			<div>
				<Input
					label={t("name")}
					value={name}
					name="name"
					placeholder={t("staff_name_placeholder")}
					required
					onChange={handleChange}
				/>
			</div>

			<fieldset className="grid grid-cols-2 gap-4">
				<div>
					<Input
						placeholder={t("staff_email_placeholder")}
						required
						type="text"
						label={t("email")}
						value={email}
						name="email"
						onChange={handleChange}
					/>
				</div>
				<div>
					<Input
						label={t("phone")}
						placeholder={t("staff_phone_placeholder")}
						type="tel"
						required
						value={phone}
						name="phone"
						onChange={handleChange}
					/>
				</div>
			</fieldset>
			<fieldset className="grid grid-cols-2 gap-4">
				<Input
					label={t("color")}
					value={color}
					name="color"
					type="color"
					onChange={handleChange}
				/>
				<Input
					label={t("avatar_url")}
					value={avatarUrl}
					name="avatarUrl"
					type="url"
					onChange={handleChange}
				/>
			</fieldset>

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

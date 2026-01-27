import {
	type Staff,
	type StaffCreate,
	useStaffActions,
} from "@novahair/client";
import { Select, STAFF_COLORS } from "@novahair/ui";
import { Avatar } from "@novahair/ui/avatar";
import { Button } from "@novahair/ui/button";
import { ErrorBoundary } from "@novahair/ui/error-boundary";
import { Input } from "@novahair/ui/input";
import type { TranslationKey } from "@novahair/utils";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const StaffForm = ({
	staff,
	onClose,
}: {
	staff?: Staff | null;
	onClose?: () => void;
}) => {
	const { t } = useTranslation();
	const isEdit = Boolean(staff);
	const { create, update } = useStaffActions();

	const [values, setValues] = useState<StaffCreate>({
		avatarUrl: staff?.avatarUrl ?? "",
		color: staff?.color ?? "",
		email: staff?.email ?? "",
		name: staff?.name ?? "",
		phone: staff?.phone ?? "",
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
				avatarUrl: staff.avatarUrl ?? "",
				color: staff.color ?? "",
				email: staff.email ?? "",
				name: staff.name,
				phone: staff.phone ?? "",
			});
		}
	}, [staff]);

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const payload: StaffCreate = {
			avatarUrl,
			color,
			email,
			name,
			phone,
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
		<ErrorBoundary>
			<form className="grid gap-4" onSubmit={onSubmit}>
				<div>
					<Input
						label={t("name")}
						name="name"
						onChange={handleChange}
						placeholder={t("staff_name_placeholder")}
						required
						value={name}
					/>
				</div>

				<fieldset className="grid grid-cols-2 gap-4">
					<div>
						<Input
							label={t("email")}
							name="email"
							onChange={handleChange}
							placeholder={t("staff_email_placeholder")}
							required
							type="text"
							value={email}
						/>
					</div>
					<div>
						<Input
							label={t("phone")}
							name="phone"
							onChange={handleChange}
							placeholder={t("staff_phone_placeholder")}
							required
							type="tel"
							value={phone}
						/>
					</div>
					<Select
						customOptionRender={(option) => (
							<div className="flex gap-2 items-center">
								<span
									className="size-4 rounded-sm"
									style={{ backgroundColor: option.value }}
								/>
								{t(option.label as TranslationKey)}
							</div>
						)}
						label={"color"}
						onChange={(value) =>
							setValues((prev) => ({ ...prev, color: value }))
						}
						options={STAFF_COLORS.map((color) => ({
							label: color.name,
							value: color.hex,
						}))}
						value={color}
					/>

					<div className="grid gap-2 grid-cols-[1fr_auto] items-end">
						<Input
							label={t("avatar_url")}
							name="avatarUrl"
							onChange={handleChange}
							placeholder="https://example.com/avatar.jpg"
							type="url"
							value={avatarUrl ?? undefined}
						/>
						<Avatar
							alt={values.name}
							className="size-9"
							src={avatarUrl ?? ""}
						/>
					</div>
				</fieldset>

				<div className="flex gap-2 justify-end">
					<Button
						disabled={saving}
						onClick={() => onClose?.()}
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

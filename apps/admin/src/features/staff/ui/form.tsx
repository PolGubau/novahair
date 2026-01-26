import {
	type Staff,
	type StaffCreate,
	useStaffActions,
} from "@novahair/client";
import { STAFF_COLORS, Select } from "@novahair/ui";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	getInitial,
} from "@novahair/ui/avatar";
import { Button } from "@novahair/ui/button";
import { ErrorBoundary } from "@novahair/ui/error-boundary";
import { Input } from "@novahair/ui/input";
import type { TranslationKey } from "@novahair/utils";
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
	const { create, update } = useStaffActions();

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
		<ErrorBoundary>
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
					<Select
						label={"color"}
						value={color}
						customOptionRender={(option) => (
							<div className="flex gap-2 items-center">
								<span
									className="size-4 rounded-sm"
									style={{ backgroundColor: option.value }}
								/>
								{t(option.label as TranslationKey)}
							</div>
						)}
						options={STAFF_COLORS.map((color) => ({
							label: color.name,
							value: color.hex,
						}))}
						onChange={(value) =>
							setValues((prev) => ({ ...prev, color: value }))
						}
					/>

					<div className="grid gap-2 grid-cols-[1fr_auto] items-end">
						<Input
							label={t("avatar_url")}
							value={avatarUrl ?? undefined}
							name="avatarUrl"
							placeholder="https://example.com/avatar.jpg"
							type="url"
							onChange={handleChange}
						/>
						<Avatar className="size-9"src={avatarUrl ?? ""} alt={values.name} />
					</div>
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
		</ErrorBoundary>
	);
};

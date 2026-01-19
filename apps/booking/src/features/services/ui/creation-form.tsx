import { t } from "i18next";
import { useEffect, useState } from "react";
import { Button } from "@novahair/ui/button";
import { Input } from "@novahair/ui/input";
import { Textarea } from "@novahair/ui/textarea";
import type { Service } from "../domain/service";
import type { EditableServiceCreateDTO } from "../domain/service.create.dto";
import { useService } from "../hooks/use-service";
 
export const ServiceCreationForm = ({
	service,
	onClose,
}: {
	service?: Service | null;
	onClose?: () => void;
}) => {
	const isEdit = Boolean(service);
	const { create, update } = useService();

	const [values, setValues] = useState<EditableServiceCreateDTO>({
		name: service?.name ?? "",
		bufferAfter: 0,
		bufferBefore: 0,
		description: service?.description ?? "",
		priceCents: service?.priceCents ?? 0,
		durationMin: service?.durationMin ?? 30,
		imageUrl: service?.imageUrl ?? "",
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

	const { name, description, priceCents, durationMin, imageUrl } = values;

	useEffect(() => {
		if (service) {
			setValues({
				name: service.name,
				description: service.description ?? "",
				bufferAfter: service.bufferAfter ?? 0,
				bufferBefore: service.bufferBefore ?? 0,
				priceCents: service.priceCents,
				imageUrl: service.imageUrl ?? "",
				durationMin: service.durationMin,
			});
		}
	}, [service]);

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const payload: EditableServiceCreateDTO = {
			name,
			description,
			imageUrl,
			priceCents,
			bufferAfter: 0,
			bufferBefore: 0,
			durationMin,
		};

		if (isEdit && service) {
			update.mutate(
				{ id: service.id, payload },
				{ onSuccess: () => onClose?.() },
			);
		} else {
			create.mutate(payload, { onSuccess: () => onClose?.() });
		}
	};

	const saving = create.isPending || update.isPending;

	return (
		<form onSubmit={onSubmit} className="grid gap-4">
			<Input
				label={t("name")}
				value={name}
				name="name"
				placeholder={t("service_name_placeholder")}
				required
				onChange={handleChange}
			/>
			<Textarea
				placeholder={t("service_description_placeholder")}
				required
				label={t("description")}
				name="description"
				value={description ?? ""}
				onChange={handleChange}
			/>

			<Input
				label={t("image_url")}
				value={imageUrl}
				name="imageUrl"
				type="url"
				required
				onChange={handleChange}
			/>
			<div className="grid grid-cols-2 gap-4">
				<div>
					<Input
						placeholder="5000"
						required
						type="number"
						label={t("price_in_cents")}
						value={priceCents}
						name="priceCents"
						onChange={handleChange}
					/>
				</div>
				<div>
					<Input
						label={t("duration_in_minutes")}
						placeholder="30"
						type="number"
						value={durationMin}
						name="durationMin"
						onChange={handleChange}
					/>
				</div>
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

export default ServiceCreationForm;

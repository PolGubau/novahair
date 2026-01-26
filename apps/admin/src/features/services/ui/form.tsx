import {
	type EditableServiceCreateDTO,
	type Service,
	type ServiceCreateDTO,
	useServiceActions,
} from "@novahair/client";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	getInitial,
} from "@novahair/ui/avatar";
import { Button } from "@novahair/ui/button";
import { ErrorBoundary } from "@novahair/ui/error-boundary";
import { Input } from "@novahair/ui/input";
import { Textarea } from "@novahair/ui/textarea";
import { config } from "@novahair/utils";
import { t } from "i18next";
import { useEffect, useState } from "react";

export const ServiceCreationForm = ({
	service,
	onClose,
}: {
	service?: Service | null;
	onClose?: () => void;
}) => {
	const isEdit = Boolean(service);
	const { create, update } = useServiceActions(config.tenantId);

	const [values, setValues] = useState<EditableServiceCreateDTO>({
		name: service?.name ?? "",
		bufferAfter: service?.bufferAfter ?? 0,
		bufferBefore: service?.bufferBefore ?? 0,
		description: service?.description ?? "",
		priceCents: service?.priceCents ?? 1000,
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
		const payload: ServiceCreateDTO = {
			name,
			tenantId: config.tenantId,
			description,
			imageUrl,
			priceCents,
			bufferAfter: 0,
			bufferBefore: 0,
			durationMin,
		};

		if (isEdit && service) {
			update.mutate(
				{ id: service.id, data: payload },
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

				<div className="grid grid-cols-[1fr_auto] gap-2 items-end">
					<Input
						label={t("image_url")}
						value={imageUrl}
						placeholder="https://example.com/image.jpg"
						name="imageUrl"
						type="url"
						required
						onChange={handleChange}
					/>
					<Avatar className="size-9" src={imageUrl ?? ""} alt={values.name} />
						 
				</div>
				<div className="grid grid-cols-2 gap-4">
					<Input
						placeholder="5000"
						required
						type="number"
						label={t("price_in_cents")}
						value={priceCents}
						name="priceCents"
						onChange={handleChange}
					/>

					<Input
						label={t("duration_in_minutes")}
						placeholder="30"
						required
						type="number"
						value={durationMin}
						name="durationMin"
						onChange={handleChange}
					/>
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
		</ErrorBoundary>
	);
};

export default ServiceCreationForm;

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
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export const ServiceCreationForm = ({
	service,
	onClose,
}: {
	service?: Service | null;
	onClose?: () => void;
}) => {
	const { t } = useTranslation();
	const isEdit = Boolean(service);
	const { create, update } = useServiceActions(config.tenantId);

	const [values, setValues] = useState<EditableServiceCreateDTO>({
		bufferAfter: service?.bufferAfter ?? 0,
		bufferBefore: service?.bufferBefore ?? 0,
		description: service?.description ?? "",
		durationMin: service?.durationMin ?? 30,
		imageUrl: service?.imageUrl ?? "",
		name: service?.name ?? "",
		priceCents: service?.priceCents ?? 1000,
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
				bufferAfter: service.bufferAfter ?? 0,
				bufferBefore: service.bufferBefore ?? 0,
				description: service.description ?? "",
				durationMin: service.durationMin,
				imageUrl: service.imageUrl ?? "",
				name: service.name,
				priceCents: service.priceCents,
			});
		}
	}, [service]);

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const payload: ServiceCreateDTO = {
			bufferAfter: 0,
			bufferBefore: 0,
			description,
			durationMin,
			imageUrl,
			name,
			priceCents,
			tenantId: config.tenantId,
		};

		if (isEdit && service) {
			update.mutate(
				{ data: payload, id: service.id },
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
				<Input
					label={t("name")}
					name="name"
					onChange={handleChange}
					placeholder={t("service_name_placeholder")}
					required
					value={name}
				/>
				<Textarea
					label={t("description")}
					name="description"
					onChange={handleChange}
					placeholder={t("service_description_placeholder")}
					required
					value={description ?? ""}
				/>

				<div className="grid grid-cols-[1fr_auto] gap-2 items-end">
					<Input
						label={t("image_url")}
						name="imageUrl"
						onChange={handleChange}
						placeholder="https://example.com/image.jpg"
						required
						type="url"
						value={imageUrl}
					/>
					<Avatar alt={values.name} className="size-9" src={imageUrl ?? ""} />
				</div>
				<div className="grid grid-cols-2 gap-4">
					<Input
						label={t("price_in_cents")}
						name="priceCents"
						onChange={handleChange}
						placeholder="5000"
						required
						type="number"
						value={priceCents}
					/>

					<Input
						label={t("duration_in_minutes")}
						name="durationMin"
						onChange={handleChange}
						placeholder="30"
						required
						type="number"
						value={durationMin}
					/>
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

export default ServiceCreationForm;

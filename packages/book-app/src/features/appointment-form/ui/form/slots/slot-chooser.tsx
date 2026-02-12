import { type AvailabilitySlot, useSlots } from "@novahair/client";
import { Label } from "@novahair/ui/label";
import { LoadingOverlay } from "@novahair/ui/loading-overlay";
import { useTranslation } from "react-i18next";
import { useTenantId } from "../../../../../shared/tenant";
import { SlotList } from "./list";
import { SlotListSkeleton } from "./list-skeleton";

type SlotChooserProps = {
	date: Date;
	staffId: string | null;
	selectedSlot: AvailabilitySlot | null;
	onChange: (slot: AvailabilitySlot) => void;
	serviceId: string;
};
export const SlotChooser = ({
	date,
	staffId,
	selectedSlot,
	onChange,
	serviceId,
}: SlotChooserProps) => {
	const { t } = useTranslation();
	
 	const tenantId = useTenantId();
	const { isLoading, error, slots } = useSlots({
		serviceId,
		tenantId,
		date,
		staffId: staffId || undefined,
	});
	return (
		<div className="flex flex-col gap-1">
 			<Label label={t("choose_time_slot")} />
			<LoadingOverlay isLoading={isLoading}>
				{isLoading ? (
					<SlotListSkeleton />
				) : error ? (
					<p className="text-error">
						{t("error_loading_slots", { message: error })}
					</p>
				) : (
					<SlotList
						slots={slots}
						selectedSlot={selectedSlot}
						onChange={onChange}
					/>
				)}
			</LoadingOverlay>
		</div>
	);
};

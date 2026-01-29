import { type AvailabilitySlot, useSlots } from "@novahair/client";
import { labelClasses } from "@novahair/ui/label";
import { LoadingOverlay } from "@novahair/ui/loading-overlay";
import { t } from "i18next";
import { Route } from "~/routes/$serviceId";
import { useTenantId } from "~/shared/tenant";
import { SlotList } from "./list";
import { SlotListSkeleton } from "./list-skeleton";

type SlotChooserProps = {
	date: Date;
	staffId: string | null;
	selectedSlot: AvailabilitySlot | null;
	onChange: (slot: AvailabilitySlot) => void;
};
export const SlotChooser = ({
	date,
	staffId,
	selectedSlot,
	onChange,
}: SlotChooserProps) => {
	const serviceId = Route.useParams().serviceId;
	const tenantId = useTenantId();
	const { isLoading, error, slots } = useSlots({
		serviceId,
		tenantId,
		date,
		staffId: staffId || undefined,
	});
	return (
		<div className="flex flex-col gap-1">
			<h3 className={labelClasses.base}>{t("choose_time_slot")}</h3>
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

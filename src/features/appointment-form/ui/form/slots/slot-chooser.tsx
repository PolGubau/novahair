import { t } from "i18next";
import { Route } from "~/routes/book/$serviceId";
import { labelClasses } from "~/shared/ui/label";
import { LoadingOverlay } from "~/shared/ui/loading-overlay";
import type { Slot } from "../../../domain/slot";
import { useSlots } from "../../../model/use-slots";
import { SlotList } from "./list";
import { SlotListSkeleton } from "./list-skeleton";

type SlotChooserProps = {
	date: Date;
	staffId?: string;
	selectedSlot: Slot | null;
	onChange: (slot: Slot) => void;
};
export const SlotChooser = ({
	date,
	staffId,
	selectedSlot,
	onChange,
}: SlotChooserProps) => {
	const serviceId = Route.useParams().serviceId;

	const { isLoading, error, slots } = useSlots({
		serviceId,
		currentDate: date,
		staffId,
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

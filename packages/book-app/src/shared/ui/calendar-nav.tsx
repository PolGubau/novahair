import { Service, Staff } from "@novahair/client";
import { IconButton } from "@novahair/ui/icon-button";
import { ArrowLeft, ArrowRight, Filter } from "lucide-react";
import { ServiceSwitcher } from "../../features/services/ui/service-switcher";
import { useTenantId } from "../tenant";
import { Drawer, Label, StaffSwitcher } from "@novahair/ui";
import { useState } from "react";
import { t } from "i18next";
import { TranslationKey } from "@novahair/utils";
 
type CalendarNavProps = {
	onPrev?: () => void;
	onNext: () => void;
	showPrev?: boolean;
	prevLabel?: TranslationKey;
	nextLabel?: TranslationKey;
	staffId?: Staff["id"];
	setStaffId: (id?: Staff["id"]) => void;
	setServiceId: (id: Service["id"]) => void;
	serviceId: Service["id"];
};

export const CalendarNav = ({
	onPrev,
	onNext,
	showPrev = true,
	prevLabel = "previous",
	nextLabel = "next",
	staffId,
	setStaffId,
	serviceId,
	setServiceId,

}: CalendarNavProps) => {
	const tenantId = useTenantId();
	const [open, setOpen] = useState(false);
	
	return (
		<nav className="flex gap-2 items-center">
			<div className="max-md:hidden flex gap-2 items-center">
				<StaffSwitcher tenantId={tenantId} staffId={staffId} onSelect={setStaffId} />
				<ServiceSwitcher serviceId={serviceId} onSelect={setServiceId} />
			</div>

 			<div className="md:hidden">
			<IconButton label={t("filter")} onClick={() => setOpen(true)}>
				<Filter />
			</IconButton>
			</div>

			<Drawer open={open} onOpenChange={setOpen} title="filter" description="customize_the_appointments_shown">
				<fieldset className="grid md:grid-cols-[auto_1fr] gap-2">
					<Label label={t("filter_by_staff")} />
					<StaffSwitcher tenantId={tenantId} staffId={staffId} onSelect={setStaffId} />
					<Label label={t("filter_by_service")} />
					<ServiceSwitcher serviceId={serviceId} onSelect={setServiceId} />
				</fieldset>
			</Drawer>


			{showPrev && (
				<IconButton onClick={onPrev} label={t(prevLabel)}>
					<ArrowLeft />
				</IconButton>
			)}

			<IconButton onClick={onNext} label={t(nextLabel)}>
				<ArrowRight />
			</IconButton>
		</nav>
	);
};

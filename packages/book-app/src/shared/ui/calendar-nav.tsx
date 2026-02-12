import { Service, Staff } from "@novahair/client";
import { Drawer, Label, StaffSelector } from "@novahair/ui";
import { IconButton } from "@novahair/ui/icon-button";
import { TranslationKey } from "@novahair/utils";
import { ArrowLeft, ArrowRight, Filter } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ServiceSwitcher } from "../../features/services/ui/service-switcher";
import { useTenantId } from "../tenant";
 
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
		const { t } = useTranslation();
	
	const tenantId = useTenantId();
	const [open, setOpen] = useState(false);
	
	return (
		<nav className="flex gap-2 items-center">
			<div className="max-md:hidden flex gap-2 items-center">
				<StaffSelector tenantId={tenantId} staffId={staffId} onSelect={v=>v&& setStaffId(v)} />
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
					<StaffSelector tenantId={tenantId} staffId={staffId} onSelect={v=>v&& setStaffId(v)} />
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

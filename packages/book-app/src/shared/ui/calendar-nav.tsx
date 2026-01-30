import { Service, Staff } from "@novahair/client";
import { IconButton } from "@novahair/ui/icon-button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ServiceSwitcher } from "../../features/services/ui/service-switcher";
import { useTenantId } from "../tenant";
import { StaffSwitcher } from "@novahair/ui";
 
type CalendarNavProps = {
	onPrev?: () => void;
	onNext: () => void;
	showPrev?: boolean;
	prevLabel?: string;
	nextLabel?: string;
	staffId?: Staff["id"];
	setStaffId: (id?: Staff["id"]) => void;
	setServiceId: (id: Service["id"]) => void;
	serviceId: Service["id"];
};

export const CalendarNav = ({
	onPrev,
	onNext,
	showPrev = true,
	prevLabel = "Anterior",
	nextLabel = "Siguiente",
	staffId,
	setStaffId,
	serviceId,
	setServiceId,

}: CalendarNavProps) => {
	const tenantId =useTenantId();
	return (
		<nav className="flex gap-4 items-center">
			<div className="max-md:hidden flex gap-2 items-center">
				<StaffSwitcher tenantId={tenantId} staffId={staffId} onSelect={setStaffId} />
				<ServiceSwitcher serviceId={serviceId} onSelect={setServiceId} />
			</div>
			{showPrev && (
				<IconButton onClick={onPrev} aria-label={prevLabel}>
					<ArrowLeft />
				</IconButton>
			)}

			<IconButton onClick={onNext} aria-label={nextLabel}>
				<ArrowRight />
			</IconButton>
		</nav>
	);
};

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { MainLayout } from "./app/layouts/main";
import { CalendarStep } from "./features/calendar/ui/view";
import { ServiceSelector } from "./features/services/ui/selector";
import { StaffListSelector } from "./features/staff/ui/list-selector";
import { TenantProvider } from "./shared/tenant";
import "./styles.css";

export const bookingSteps = ["services", "staff", "calendar"] as const;
export type BookingStep = typeof bookingSteps[number];

 

export type BookingAppProps = {
	tenantId: string;
};


// export const stepsRender:Record<BookingStep, React.ReactNode> = {
// 	services: <ServiceSelector onServiceSelect={() => {}} />,
// 	staff: <StaffListSelector serviceId="" onStaffSelect={() => {}} />,
// 	calendar: <CalendarStep serviceId="" />,
// };



export function BookingApp({ tenantId }: BookingAppProps) {
	const [step, setStep] = useState<BookingStep>("services");
	const [selectedServiceId, setSelectedServiceId] = useState<string>();
	const [selectedStaffId, setSelectedStaffId] = useState<string>();

	const handleServiceSelect = (serviceId: string) => {
		setSelectedServiceId(serviceId);
		setStep("staff");
	};

	const handleStaffSelect = (staffId: string) => {
		setSelectedStaffId(staffId);
		setStep("calendar");
	};

 

  return (
    <MainLayout currentStep={step} setStep={setStep}>
		<TenantProvider tenantId={tenantId}>
 				{step === "services" && (
					<ServiceSelector onServiceSelect={handleServiceSelect} />
				)}
				{step === "staff" && selectedServiceId && (
						<StaffListSelector
						serviceId={selectedServiceId}
						onStaffSelect={handleStaffSelect}
 					/>
				)}
				{step === "calendar" && selectedServiceId &&  (
					<CalendarStep
          setSelectedServiceId={setSelectedServiceId}
          setSelectedStaffId={setSelectedStaffId}
						serviceId={selectedServiceId}
						staffId={selectedStaffId}
 					/>
				)}
				<ReactQueryDevtools />
       </TenantProvider>
      </MainLayout>
	);
}
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { CalendarStep } from "./features/calendar/ui/view";
import { ServiceSelector } from "./features/services/ui/selector";
import { StaffListSelector } from "./features/staff/ui/list-selector";
import { TenantProvider } from "./shared/tenant";
import { MainLayout } from "./app/layouts/main";
import "./styles.css"; 

export const bookingSteps = ["services", "staff", "calendar"] as const;
export type BookingStep = typeof bookingSteps[number];

const queryClient = new QueryClient();

export function BookingApp({ tenantId }: { tenantId: string }) {
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
    <MainLayout currentStep={step} setCurrentStep={setStep}>
		<TenantProvider tenantId={tenantId}>
			<QueryClientProvider client={queryClient}>
				{step === "services" && (
					<ServiceSelector onServiceSelect={handleServiceSelect} />
				)}
				{step === "staff" && selectedServiceId && (
						<StaffListSelector
							
						serviceId={selectedServiceId}
						onStaffSelect={handleStaffSelect}
 					/>
				)}
				{step === "calendar" && selectedServiceId && selectedStaffId && (
					<CalendarStep
          setSelectedServiceId={setSelectedServiceId}
          setSelectedStaffId={setSelectedStaffId}
						serviceId={selectedServiceId}
						staffId={selectedStaffId}
 					/>
				)}
				<ReactQueryDevtools />
			</QueryClientProvider>
      </TenantProvider>
      </MainLayout>
	);
}
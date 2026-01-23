// Auto-generated DTOs from BACKEND.json

import type { Staff } from "./features/staff";

export type TenantDto = {
	id: string;
	name: string;
	slug: string;
};

export type StaffDto = {
	id: string;
	tenantId: string;
	name: string;
	email: string;
	phone: string;
	color: string;
	avatarUrl: string | null;
};

export type ServiceDto = {
	id: string;
	tenantId: string;
	name: string;
	durationMin: number;
	priceCents: number;
	bufferBefore: number;
	bufferAfter: number;
};

export type CustomerDto = {
	id: string;
	name: string;
	email: string;
	phone: string;
};

export type AppointmentStatusDto =
	| "PENDING"
	| "CONFIRMED"
	| "CANCELLED"
	| "COMPLETED";

export type AppointmentDto = {
	id: string;
	tenantId: string;
	serviceId: string;
	staffId: string;
	customer: CustomerDto;
	startsAt: string;
	status: AppointmentStatusDto;
	notes: string;
};

export type WorkingHoursDto = {
	id: string;
	staffId: string;
	weekday: number;
	startTime: string;
	endTime: string;
};

export type ScheduleDto = {
	startTime: string;
	endTime: string;
};

export type AvailabilitySlotDto = {
	staff: Staff[];
	start: string;
	end: string;
	startLocal: string;
	endLocal: string;
};

// DTOs for requests
export type CreateTenantDto = {
	name: string;
	slug: string;
};

export type UpdateTenantDto = CreateTenantDto;

export type CreateStaffDto = {
	tenantId: string;
	name: string;
	email: string;
	phone: string;
	color: string;
	avatarUrl: string | null;
};

export type UpdateStaffDto = CreateStaffDto;

export type CreateServiceDto = {
	tenantId: string;
	name: string;
	durationMin: number;
	priceCents: number;
	bufferBefore: number;
	bufferAfter: number;
};

export type UpdateServiceDto = CreateServiceDto;

export type CreateAppointmentDto = {
	serviceId: string;
	staffId: string | null;
	customer: {
		name: string;
		email: string;
		phone: string;
	};
	startsAt: string;
	notes: string;
};

export type UpdateAppointmentStatusDto = {
	status: AppointmentStatusDto;
};

export type CreateWorkingHoursDto = {
	staffId: string;
	weekday: number;
	startTime: string;
	endTime: string;
};

export type UpdateWorkingHoursDto = CreateWorkingHoursDto;

export type AssignServicesToStaffDto = string[];

export type CreateScheduleDto = ScheduleDto[];

export type CreateCustomerDto = {
	name: string;
	email: string;
	phone: string;
};

export type UpdateCustomerDto = CreateCustomerDto;

// Auto-generated DTOs from BACKEND.json

import type { ISODate } from "@novahair/utils";
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
	services: ServiceDto[];
	phone: string;
	color: string;
	avatarUrl: string | null;
};

export type ServiceDto = {
	id: string;
	tenantId: string;
	name: string;
	description: string | null;
	durationMin: number;
	imageUrl: string | null;
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
	staff: StaffDto;
	customer: CustomerDto;
	notes: string | null;
	service: ServiceDto;
	startAt: ISODate;
	endsAt: ISODate;
	status: AppointmentStatusDto;
};

export type WorkingHoursDto = {
	id: string;
	staffId: string;
	weekday: number;
	startTime: string;
	endTime: string;
};

export type ScheduleDto = {
	id: string;
	startTime: ISODate;
	endTime: ISODate;
};

export type AvailabilitySlotDto = {
	staff: Staff[];
	start: ISODate;
	end: ISODate;
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

export type CreateAppointmentDto = {
	tenantId: string;
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

export type AssignServicesToStaffDto = { serviceIds: string[] };

export type CreateScheduleDto = Omit<ScheduleDto, "id">;
export type UpdateScheduleDto = ScheduleDto;

export type CreateCustomerDto = {
	name: string;
	email: string;
	phone: string;
};

export type UpdateCustomerDto = CreateCustomerDto;

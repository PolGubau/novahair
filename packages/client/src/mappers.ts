import type { Appointment } from "./features/appointments";
import type { AvailabilitySlot } from "./features/availability/domain/slot";
import type { Service } from "./features/services/domain/service";
import type { Staff } from "./features/staff/domain/staff";
import type {
	AppointmentDto,
	AvailabilitySlotDto,
	CustomerDto,
	ScheduleDto,
	ServiceDto,
	StaffDto,
	TenantDto,
	WorkingHoursDto,
} from "./types";

// Mappers from DTOs to Domain entities

export function toStaff(dto: StaffDto): Staff {
	return {
		id: dto.id,
		tenantId: dto.tenantId,
		name: dto.name,
		email: dto.email,
		phone: dto.phone,
		color: dto.color,
		avatarUrl: dto.avatarUrl || null,
	};
}

export function toService(dto: ServiceDto): Service {
	return {
		id: dto.id,
		tenantId: dto.tenantId,
		name: dto.name,
		description: dto.description,
		imageUrl: dto.imageUrl,
		durationMin: dto.durationMin,
		priceCents: dto.priceCents,
		bufferBefore: dto.bufferBefore,
		bufferAfter: dto.bufferAfter,
	};
}

export function toCustomer(dto: CustomerDto) {
	return dto; // Assuming Customer domain is the same
}

export function toAppointment(dto: AppointmentDto): Appointment {
	return {
		...dto,
		customer: toCustomer(dto.customer),
	};
}

export function toWorkingHours(dto: WorkingHoursDto) {
	return dto; // Assuming same
}

export function toSchedule(dto: ScheduleDto) {
	return dto; // Assuming same
}

export function toAvailabilitySlot(dto: AvailabilitySlotDto): AvailabilitySlot {
	return dto;
}

export function toTenant(dto: TenantDto) {
	return dto; // Assuming same
}

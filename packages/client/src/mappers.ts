import type { AvailabilitySlot } from "./features/availability/domain/slot";
import type { Service } from "./features/services/domain/service";
import type { ServiceCreateDTO } from "./features/services/domain/service.create.dto";
import type { Staff } from "./features/staff/domain/staff";
import type {
	AppointmentDto,
	AvailabilitySlotDto,
	CreateServiceDto,
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
		description: null, // Not in DTO, default to null
		imageUrl: null, // Not in DTO, default to null
		durationMin: dto.durationMin,
		priceCents: dto.priceCents,
		bufferBefore: dto.bufferBefore,
		bufferAfter: dto.bufferAfter,
	};
}

export function toCustomer(dto: CustomerDto) {
	return dto; // Assuming Customer domain is the same
}

export function toAppointment(dto: AppointmentDto) {
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

// Mappers from Domain DTOs to API DTOs

export function toCreateServiceDto(dto: ServiceCreateDTO): CreateServiceDto {
	return {
		tenantId: dto.tenantId,
		name: dto.name,
		durationMin: dto.durationMin,
		priceCents: dto.priceCents,
		bufferBefore: dto.bufferBefore,
		bufferAfter: dto.bufferAfter,
	};
}

export function toUpdateServiceDto(
	dto: Partial<ServiceCreateDTO>,
): Partial<CreateServiceDto> {
	const result: Partial<CreateServiceDto> = {};
	if (dto.tenantId !== undefined) result.tenantId = dto.tenantId;
	if (dto.name !== undefined) result.name = dto.name;
	if (dto.durationMin !== undefined) result.durationMin = dto.durationMin;
	if (dto.priceCents !== undefined) result.priceCents = dto.priceCents;
	if (dto.bufferBefore !== undefined) result.bufferBefore = dto.bufferBefore;
	if (dto.bufferAfter !== undefined) result.bufferAfter = dto.bufferAfter;
	return result;
}

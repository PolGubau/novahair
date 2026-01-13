import { describe, expect, it } from "vitest";
import type { Appointment } from "../domain/appointments";

describe("Appointment Domain", () => {
	it("should create a valid appointment object", () => {
		const appointment: Appointment = {
			serviceId: "service-1",
			staffId: "staff-1",
			customer: {
				name: "María García",
				email: "maria@example.com",
				phone: "+34612345678",
			},
			startsAt: "2026-01-15T10:00:00Z",
			notes: "Cliente preferente",
		};

		expect(appointment).toBeDefined();
		expect(appointment.customer.email).toBe("maria@example.com");
		expect(appointment.serviceName).toBe("Corte de Pelo");
	});

	it("should validate appointment has required fields", () => {
		const appointment: Appointment = {
			id: "1",
			serviceId: "service-1",
			serviceName: "Corte de Pelo",
			customer: {
				name: "María García",
				email: "maria@example.com",
				phone: "+34612345678",
			},
			startsAt: "2026-01-15T10:00:00Z",
			endsAt: "2026-01-15T11:00:00Z",
			status: "pending",
		};

		expect(appointment.id).toBeTruthy();
		expect(appointment.customer).toBeDefined();
		expect(appointment.startsAt).toBeTruthy();
		expect(appointment.endsAt).toBeTruthy();
	});

	it("should handle optional fields correctly", () => {
		const appointment: Appointment = {
			id: "1",
			serviceId: "service-1",
			serviceName: "Corte de Pelo",
			customer: {
				name: "María García",
				email: "maria@example.com",
				phone: "+34612345678",
			},
			startsAt: "2026-01-15T10:00:00Z",
			endsAt: "2026-01-15T11:00:00Z",
			status: "confirmed",
			// staffId, staffName, notes son opcionales
		};

		expect(appointment.staffId).toBeUndefined();
		expect(appointment.notes).toBeUndefined();
	});
});

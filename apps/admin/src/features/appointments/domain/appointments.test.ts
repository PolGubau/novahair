import { describe, expect, it } from "vitest";
import type { SummarizedAppointment } from "./summarized-appointments";

describe("Appointment Domain", () => {
	it("should create a valid appointment object", () => {
		const appointment: SummarizedAppointment = {
			customer: {
				email: "maria@example.com",
				name: "María García",
				phone: "+34612345678",
			},
			notes: "Cliente preferente",
			serviceId: "service-1",
			staffId: "staff-1",
			startsAt: "2026-01-15T10:00:00Z",
		};

		expect(appointment).toBeDefined();
		expect(appointment.customer.email).toBe("maria@example.com");
		expect(appointment.serviceId).toBe("service-1");
	});

	it("should validate appointment has required fields", () => {
		const appointment: SummarizedAppointment = {
			customer: {
				email: "maria@example.com",
				name: "María García",
				phone: "+34612345678",
			},
			notes: "Cliente preferente",
			serviceId: "service-1",
			staffId: "staff-1",
			startsAt: "2026-01-15T10:00:00Z",
		};

		expect(appointment.customer).toBeDefined();
		expect(appointment.startsAt).toBeTruthy();
	});

	it("should handle optional fields correctly", () => {
		const appointment: SummarizedAppointment = {
			customer: {
				email: "maria@example.com",
				name: "María García",
				phone: "+34612345678",
			},
			serviceId: "service-1",
			staffId: undefined,
			startsAt: "2026-01-15T10:00:00Z",
		};

		expect(appointment.staffId).toBeUndefined();
		expect(appointment.notes).toBeUndefined();
	});
});

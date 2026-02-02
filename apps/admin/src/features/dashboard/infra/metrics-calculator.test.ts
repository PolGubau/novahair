/**
 * Metrics Calculator Tests
 * 
 * Unit tests for the infrastructure layer
 * These tests verify the business logic without UI dependencies
 */

import { describe, it, expect } from "vitest";
import type { Appointment } from "@novahair/client";
import { toISODate } from "@novahair/utils";
import {
	calculateAppointmentStats,
	calculateRevenue,
	calculateRevenueBreakdown,
	generateKPIs,
} from "./metrics-calculator";

// Mock data factory
const createMockAppointment = (
	overrides: Partial<Appointment> = {},
): Appointment => ({
	id: "apt-1",
	status: "COMPLETED",
	startsAt: toISODate(new Date("2024-01-15T10:00:00")),
	endsAt: toISODate(new Date("2024-01-15T11:00:00")),
	notes: null,
	staff: {
		tenantId: "tenant-1",	
		id: "staff-1",
		name: "John Doe",
		email: "john@example.com",
		phone: "+34600000000",
		color: "#FF5733",
		avatarUrl: null,
		services: [],
	},
	customer: {
		id: "customer-1",
		name: "Jane Smith",
		email: "jane@example.com",
		phone: "+34600000001",
	},
	service: {
		tenantId: "tenant-1",
		id: "service-1",
		name: "Haircut",
		description: "Basic haircut",
		durationMin: 60,
		priceCents: 3000, // 30€
		imageUrl: null,
		bufferBefore: 0,
		bufferAfter: 0,
	},
	...overrides,
});

describe("calculateAppointmentStats", () => {
	it("should calculate correct statistics for empty array", () => {
		const stats = calculateAppointmentStats([]);

		expect(stats.total).toBe(0);
		expect(stats.completed).toBe(0);
		expect(stats.confirmed).toBe(0);
		expect(stats.pending).toBe(0);
		expect(stats.cancelled).toBe(0);
		expect(stats.cancellationRate).toBe(0);
		expect(stats.completionRate).toBe(0);
	});

	it("should calculate correct statistics for mixed appointments", () => {
		const appointments = [
			createMockAppointment({ status: "COMPLETED" }),
			createMockAppointment({ status: "COMPLETED" }),
			createMockAppointment({ status: "CONFIRMED" }),
			createMockAppointment({ status: "PENDING" }),
			createMockAppointment({ status: "CANCELLED" }),
		];

		const stats = calculateAppointmentStats(appointments);

		expect(stats.total).toBe(5);
		expect(stats.completed).toBe(2);
		expect(stats.confirmed).toBe(1);
		expect(stats.pending).toBe(1);
		expect(stats.cancelled).toBe(1);
		expect(stats.cancellationRate).toBe(20); // 1/5 = 20%
		expect(stats.completionRate).toBe(40); // 2/5 = 40%
	});
});

describe("calculateRevenue", () => {
	it("should return 0 for empty array", () => {
		const revenue = calculateRevenue([]);
		expect(revenue).toBe(0);
	});

	it("should only count completed appointments", () => {
		const appointments = [
			createMockAppointment({ status: "COMPLETED", service: { ...createMockAppointment().service, priceCents: 3000 } }),
			createMockAppointment({ status: "PENDING", service: { ...createMockAppointment().service, priceCents: 2000 } }),
			createMockAppointment({ status: "CANCELLED", service: { ...createMockAppointment().service, priceCents: 1000 } }),
		];

		const revenue = calculateRevenue(appointments);
		expect(revenue).toBe(3000); // Only the completed one
	});

	it("should sum all completed appointments correctly", () => {
		const appointments = [
			createMockAppointment({ status: "COMPLETED", service: { ...createMockAppointment().service, priceCents: 3000 } }),
			createMockAppointment({ status: "COMPLETED", service: { ...createMockAppointment().service, priceCents: 4500 } }),
			createMockAppointment({ status: "COMPLETED", service: { ...createMockAppointment().service, priceCents: 2500 } }),
		];

		const revenue = calculateRevenue(appointments);
		expect(revenue).toBe(10000); // 30€ + 45€ + 25€ = 100€
	});
});

describe("calculateRevenueBreakdown", () => {
	it("should return empty array for no appointments", () => {
		const breakdown = calculateRevenueBreakdown([]);
		expect(breakdown).toEqual([]);
	});

	it("should group by service and calculate percentages", () => {
		const appointments = [
			createMockAppointment({
				status: "COMPLETED",
				service: { ...createMockAppointment().service, id: "s1", name: "Haircut", priceCents: 3000 },
			}),
			createMockAppointment({
				status: "COMPLETED",
				service: { ...createMockAppointment().service, id: "s1", name: "Haircut", priceCents: 3000 },
			}),
			createMockAppointment({
				status: "COMPLETED",
				service: { ...createMockAppointment().service, id: "s2", name: "Color", priceCents: 6000 },
			}),
		];

		const breakdown = calculateRevenueBreakdown(appointments);

		expect(breakdown).toHaveLength(2);
		expect(breakdown[0].serviceName).toBe("Color"); // Sorted by revenue
		expect(breakdown[0].revenueCents).toBe(6000);
		expect(breakdown[0].appointmentCount).toBe(1);
		expect(breakdown[0].percentage).toBe(50); // 6000 / 12000 = 50%

		expect(breakdown[1].serviceName).toBe("Haircut");
		expect(breakdown[1].revenueCents).toBe(6000);
		expect(breakdown[1].appointmentCount).toBe(2);
		expect(breakdown[1].percentage).toBe(50);
	});
});

describe("generateKPIs", () => {
	it("should generate KPIs with correct trend calculations", () => {
		const currentAppointments = [
			createMockAppointment({ status: "COMPLETED", service: { ...createMockAppointment().service, priceCents: 5000 } }),
			createMockAppointment({ status: "COMPLETED", service: { ...createMockAppointment().service, priceCents: 5000 } }),
		];

		const previousAppointments = [
			createMockAppointment({ status: "COMPLETED", service: { ...createMockAppointment().service, priceCents: 4000 } }),
		];

		const kpis = generateKPIs(currentAppointments, previousAppointments);

		expect(kpis).toHaveLength(4);

		// Total Revenue KPI
		const revenueKPI = kpis.find((k) => k.id === "total-revenue");
		expect(revenueKPI?.value).toBe(10000);
		expect(revenueKPI?.previousValue).toBe(4000);
		expect(revenueKPI?.changePercentage).toBe(150); // (10000 - 4000) / 4000 * 100

		// Total Appointments KPI
		const appointmentsKPI = kpis.find((k) => k.id === "total-appointments");
		expect(appointmentsKPI?.value).toBe(2);
		expect(appointmentsKPI?.previousValue).toBe(1);
		expect(appointmentsKPI?.changePercentage).toBe(100); // (2 - 1) / 1 * 100
	});
});


/**
 * Dashboard Infrastructure Layer - Metrics Calculator
 * 
 * This service calculates dashboard metrics from raw data.
 * It implements the business logic for transforming appointments, services,
 * and staff data into meaningful metrics.
 */

import type { Appointment, Staff } from "@novahair/client";
import { toISODate } from "@novahair/utils";
import {
	eachDayOfInterval,
	endOfDay,
	format,
	isWithinInterval,
	parseISO,
	startOfDay
} from "date-fns";
import type {
	AppointmentStats,
	DataPoint,
	DateRange,
	KPI,
	RevenueBreakdown,
	StaffPerformance,
	TrendData
} from "../domain/metrics";

/**
 * Formats currency in cents to display string
 */
const formatCurrency = (cents: number): string => {
	return new Intl.NumberFormat("es-ES", {
		style: "currency",
		currency: "EUR",
	}).format(cents / 100);
};

/**
 * Formats a number with thousand separators
 */
const formatNumber = (value: number): string => {
	return new Intl.NumberFormat("es-ES").format(value);
};

/**
 * Calculates percentage change between two values
 */
const calculatePercentageChange = (current: number, previous: number): number => {
	if (previous === 0) return current > 0 ? 100 : 0;
	return Number((((current - previous) / previous) * 100).toFixed(2));
};

 

/**
 * Calculates appointment statistics
 */
export const calculateAppointmentStats = (
	appointments: Appointment[],
): AppointmentStats => {
	const total = appointments.length;
	const confirmed = appointments.filter((a) => a.status === "CONFIRMED").length;
	const pending = appointments.filter((a) => a.status === "PENDING").length;
	const cancelled = appointments.filter((a) => a.status === "CANCELLED").length;
	const completed = appointments.filter((a) => a.status === "COMPLETED").length;

	const cancellationRate = total > 0 ? (cancelled / total) * 100 : 0;
	const completionRate = total > 0 ? (completed / total) * 100 : 0;

	return {
		total,
		confirmed,
		pending,
		cancelled,
		completed,
		cancellationRate,
		completionRate,
	};
};

/**
 * Calculates total revenue from appointments
 */
export const calculateRevenue = (appointments: Appointment[]): number => {
	return appointments.reduce((sum, apt) => {
		// Only count completed appointments for revenue
		if (apt.status === "COMPLETED") {
			return sum + apt.service.priceCents;
		}
		return sum;
	}, 0);
};

/**
 * Calculates revenue breakdown by service
 */
export const calculateRevenueBreakdown = (
	appointments: Appointment[],
): RevenueBreakdown[] => {
	const serviceMap = new Map<string, RevenueBreakdown>();
	const totalRevenue = calculateRevenue(appointments);

	for (const apt of appointments) {
		if (apt.status !== "COMPLETED") continue;

		const existing = serviceMap.get(apt.service.id);
		if (existing) {
			existing.revenueCents += apt.service.priceCents;
			existing.appointmentCount += 1;
		} else {
			serviceMap.set(apt.service.id, {
				serviceId: apt.service.id,
				serviceName: apt.service.name,
				revenueCents: apt.service.priceCents,
				appointmentCount: 1,
				percentage: 0,
			});
		}
	}

	// Calculate percentages
	const breakdown = Array.from(serviceMap.values());
	for (const item of breakdown) {
		item.percentage = totalRevenue > 0 ? (item.revenueCents / totalRevenue) * 100 : 0;
	}

	return breakdown.sort((a, b) => b.revenueCents - a.revenueCents);
};

/**
 * Calculates staff performance metrics
 */
export const calculateStaffPerformance = (
	appointments: Appointment[],
	allStaff: Staff[],
): StaffPerformance[] => {
	const staffMap = new Map<string, StaffPerformance>();

	// Initialize all staff
	for (const staff of allStaff) {
		staffMap.set(staff.id, {
			staffId: staff.id,
			staffName: staff.name,
			appointmentCount: 0,
			revenueCents: 0,
			occupancyRate: 0,
		});
	}

	// Aggregate appointments
	for (const apt of appointments) {
		const existing = staffMap.get(apt.staff.id);
		if (existing) {
			existing.appointmentCount += 1;
			if (apt.status === "COMPLETED") {
				existing.revenueCents += apt.service.priceCents;
			}
		}
	}

	return Array.from(staffMap.values()).sort(
		(a, b) => b.appointmentCount - a.appointmentCount,
	);
};

/**
 * Calculates appointment trends over time
 */
export const calculateAppointmentTrends = (
	appointments: Appointment[],
	range: DateRange,
): TrendData => {
	const start = parseISO(range.from);
	const end = parseISO(range.to);
	const days = eachDayOfInterval({ start, end });

	const dataPoints: DataPoint[] = days.map((day) => {
		const dayStart = startOfDay(day);
		const dayEnd = endOfDay(day);

		const count = appointments.filter((apt) => {
			const aptDate = parseISO(apt.startsAt);
			return isWithinInterval(aptDate, { start: dayStart, end: dayEnd });
		}).length;

		return {
			date: toISODate(day),
			value: count,
			label: format(day, "dd/MM"),
		};
	});

	const total = dataPoints.reduce((sum, dp) => sum + dp.value, 0);
	const average = dataPoints.length > 0 ? total / dataPoints.length : 0;

	return {
		metricId: "appointments",
		name: "appointments",
		data: dataPoints,
		total,
		average,
	};
};

/**
 * Calculates revenue trends over time
 */
export const calculateRevenueTrends = (
	appointments: Appointment[],
	range: DateRange,
): TrendData => {
	const start = parseISO(range.from);
	const end = parseISO(range.to);
	const days = eachDayOfInterval({ start, end });

	const dataPoints: DataPoint[] = days.map((day) => {
		const dayStart = startOfDay(day);
		const dayEnd = endOfDay(day);

		const revenue = appointments
			.filter((apt) => {
				const aptDate = parseISO(apt.startsAt);
				return (
					apt.status === "COMPLETED" &&
					isWithinInterval(aptDate, { start: dayStart, end: dayEnd })
				);
			})
			.reduce((sum, apt) => sum + apt.service.priceCents, 0);

		return {
			date: toISODate(day),
			value: revenue / 100, // Convert to euros for chart
			label: format(day, "dd/MM"),
		};
	});

	const total = dataPoints.reduce((sum, dp) => sum + dp.value, 0);
	const average = dataPoints.length > 0 ? total / dataPoints.length : 0;

	return {
		metricId: "revenue",
		name: "revenue",
		data: dataPoints,
		total,
		average,
	};
};

/**
 * Generates KPIs from appointments data
 */
export const generateKPIs = (
	currentAppointments: Appointment[],
	previousAppointments: Appointment[],
): KPI[] => {
	const currentRevenue = calculateRevenue(currentAppointments);
	const previousRevenue = calculateRevenue(previousAppointments);
	const currentCount = currentAppointments.length;
	const previousCount = previousAppointments.length;
	const currentCompleted = currentAppointments.filter(
		(a) => a.status === "COMPLETED",
	).length;
	const previousCompleted = previousAppointments.filter(
		(a) => a.status === "COMPLETED",
	).length;

	return [
		{
			id: "total-revenue",
			label: "total_revenue",
			value: currentRevenue,
			previousValue: previousRevenue,
			formattedValue: formatCurrency(currentRevenue),
			unit: "currency",
			changePercentage: calculatePercentageChange(currentRevenue, previousRevenue),
			isPositiveTrend: true,
		},
		{
			id: "total-appointments",
			label: "total_appointments",
			value: currentCount,
			previousValue: previousCount,
			formattedValue: formatNumber(currentCount),
			unit: "count",
			changePercentage: calculatePercentageChange(currentCount, previousCount),
			isPositiveTrend: true,
		},
		{
			id: "completed-appointments",
			label: "completed_appointments",
			value: currentCompleted,
			previousValue: previousCompleted,
			formattedValue: formatNumber(currentCompleted),
			unit: "count",
			changePercentage: calculatePercentageChange(
				currentCompleted,
				previousCompleted,
			),
			isPositiveTrend:  true,
		},
		{
			id: "average-ticket",
			label: "average_ticket",
			value: currentCompleted > 0 ? currentRevenue / currentCompleted : 0,
			previousValue:
				previousCompleted > 0 ? previousRevenue / previousCompleted : 0,
			formattedValue:
				currentCompleted > 0
					? formatCurrency(currentRevenue / currentCompleted)
					: formatCurrency(0),
			unit: "currency",
			changePercentage: calculatePercentageChange(
				currentCompleted > 0 ? currentRevenue / currentCompleted : 0,
				previousCompleted > 0 ? previousRevenue / previousCompleted : 0,
			),
			isPositiveTrend: true,
		},
	];
};


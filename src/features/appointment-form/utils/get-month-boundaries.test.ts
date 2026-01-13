import { describe, it, expect } from "vitest";
import { getMonthBoundaries } from "./get-month-boundaries";

describe("getMonthBoundaries", () => {
	it("returns boundaries for January (31 days)", () => {
		const date = new Date("2023-01-15T10:00:00Z");
		const { start, end } = getMonthBoundaries(date);
		expect(start.toISOString()).toBe("2023-01-01T00:00:00.000Z");
		expect(end.toISOString()).toBe("2023-01-31T23:59:59.999Z");
	});

	it("returns boundaries for April (30 days)", () => {
		const date = new Date("2023-04-10T00:00:00Z");
		const { start, end } = getMonthBoundaries(date);
		expect(start.toISOString()).toBe("2023-04-01T00:00:00.000Z");
		expect(end.toISOString()).toBe("2023-04-30T23:59:59.999Z");
	});

	it("handles non-leap February (28 days)", () => {
		const date = new Date("2021-02-11T14:00:00Z");
		const { start, end } = getMonthBoundaries(date);
		expect(start.toISOString()).toBe("2021-02-01T00:00:00.000Z");
		expect(end.toISOString()).toBe("2021-02-28T23:59:59.999Z");
	});

	it("handles leap year February (29 days)", () => {
		const date = new Date("2020-02-20T08:00:00Z");
		const { start, end } = getMonthBoundaries(date);
		expect(start.toISOString()).toBe("2020-02-01T00:00:00.000Z");
		expect(end.toISOString()).toBe("2020-02-29T23:59:59.999Z");
	});

	it("handles year boundary (December)", () => {
		const date = new Date("2022-12-15T12:00:00Z");
		const { start, end } = getMonthBoundaries(date);
		expect(start.toISOString()).toBe("2022-12-01T00:00:00.000Z");
		expect(end.toISOString()).toBe("2022-12-31T23:59:59.999Z");
	});

	it("is safe across time zones (input with offset)", () => {
		// 2023-03-01T00:30:00-05:00 == 2023-03-01T05:30:00Z
		const date = new Date("2023-03-01T00:30:00-05:00");
		const { start, end } = getMonthBoundaries(date);
		expect(start.toISOString()).toBe("2023-03-01T00:00:00.000Z");
		expect(end.toISOString()).toBe("2023-03-31T23:59:59.999Z");
	});
});

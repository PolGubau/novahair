import { describe, expect, it } from "vitest";
import { getMonthBoundaries } from "./get-month-boundaries";

describe("getMonthBoundaries", () => {
	it("returns start = 1 and correct end for a 31-day month (January 2023)", () => {
		const input = new Date(2023, 0, 15); // Jan 15, 2023
		const before = input.getTime();
		const { start, end } = getMonthBoundaries(input);

		expect(start.getFullYear()).toBe(2023);
		expect(start.getMonth()).toBe(0);
		expect(start.getDate()).toBe(1);

		expect(end.getFullYear()).toBe(2023);
		expect(end.getMonth()).toBe(0);
		expect(end.getDate()).toBe(31);

		expect(start.getTime()).toBeLessThanOrEqual(input.getTime());
		expect(end.getTime()).toBeGreaterThanOrEqual(input.getTime());

		// original date not mutated
		expect(input.getTime()).toBe(before);
	});

	it("handles a 30-day month (April 2023)", () => {
		const input = new Date(2023, 3, 10); // Apr 10, 2023
		const { start, end } = getMonthBoundaries(input);

		expect(start.getDate()).toBe(1);
		expect(start.getMonth()).toBe(3);

		expect(end.getDate()).toBe(30);
		expect(end.getMonth()).toBe(3);
	});

	it("handles February in a non-leap year (Feb 2023 -> 28 days)", () => {
		const input = new Date(2023, 1, 5); // Feb 5, 2023
		const { start, end } = getMonthBoundaries(input);

		expect(start.getMonth()).toBe(1);
		expect(start.getDate()).toBe(1);

		expect(end.getMonth()).toBe(1);
		expect(end.getDate()).toBe(28);
	});

	it("handles February in a leap year (Feb 2024 -> 29 days)", () => {
		const input = new Date(2024, 1, 20); // Feb 20, 2024 (leap year)
		const { start, end } = getMonthBoundaries(input);

		expect(start.getMonth()).toBe(1);
		expect(start.getDate()).toBe(1);

		expect(end.getMonth()).toBe(1);
		expect(end.getDate()).toBe(29);
	});

	it("works for December and does not roll month incorrectly", () => {
		const input = new Date(2022, 11, 31); // Dec 31, 2022
		const { start, end } = getMonthBoundaries(input);

		expect(start.getFullYear()).toBe(2022);
		expect(start.getMonth()).toBe(11);
		expect(start.getDate()).toBe(1);

		expect(end.getFullYear()).toBe(2022);
		expect(end.getMonth()).toBe(11);
		expect(end.getDate()).toBe(31);
	});

	it("ensures start is before or equal to end", () => {
		const input = new Date(2025, 6, 7); // Jul 7, 2025
		const { start, end } = getMonthBoundaries(input);

		expect(start.getTime()).toBeLessThanOrEqual(end.getTime());
	});
});

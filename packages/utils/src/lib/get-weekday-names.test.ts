import { describe, expect, it } from "vitest";
import { getWeekdayNames } from "./get-weekday-names";

type WeekdayName = { long: string; short: string };

const buildExpected = (locale = "es-ES"): WeekdayName[] => {
	const longFmt = new Intl.DateTimeFormat(locale, { weekday: "long" });
	const shortFmt = new Intl.DateTimeFormat(locale, { weekday: "short" });

	const referenceMonday = new Date(Date.UTC(2025, 0, 6)); // 6 Jan 2025 is a Monday
	return Array.from({ length: 7 }, (_, i) => {
		const day = new Date(referenceMonday);
		day.setUTCDate(referenceMonday.getUTCDate() + i);
		return { long: longFmt.format(day), short: shortFmt.format(day) };
	});
};

describe("getWeekdayNames", () => {
	it("returns an array of 7 items with long and short strings", () => {
		const res = getWeekdayNames();
		expect(Array.isArray(res)).toBe(true);
		expect(res).toHaveLength(7);
		for (const item of res) {
			expect(typeof item.long).toBe("string");
			expect(item.long.length).toBeGreaterThan(0);
			expect(typeof item.short).toBe("string");
			expect(item.short.length).toBeGreaterThan(0);
		}
	});

	it("produces the expected weekday names for a given locale (uses Intl for expected)", () => {
		const locale = "en-US";
		const expected = buildExpected(locale);
		const actual = getWeekdayNames(locale);
		expect(actual).toEqual(expected);
	});

	it("uses es-ES as the default locale", () => {
		const expected = buildExpected("es-ES");
		const actual = getWeekdayNames();
		expect(actual).toEqual(expected);
	});
});

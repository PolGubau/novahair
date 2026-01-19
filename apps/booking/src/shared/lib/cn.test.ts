import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn utility", () => {
	it("should merge class names correctly", () => {
		expect(cn("class1", "class2")).toBe("class1 class2");
	});

	it("should handle conditional classes", () => {
		expect(cn("base", false && "hidden", true && "visible")).toBe(
			"base visible",
		);
	});

	it("should handle undefined and null", () => {
		expect(cn("base", undefined, null)).toBe("base");
	});

	it("should merge tailwind classes correctly", () => {
		expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
	});

	it("should handle empty input", () => {
		expect(cn()).toBe("");
	});

	it("should handle array of classes", () => {
		expect(cn(["class1", "class2"])).toBe("class1 class2");
	});
});

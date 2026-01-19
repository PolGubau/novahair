import { describe, expect, it } from "vitest";
import { tryCatch } from "./try-catch";

describe("tryCatch utility", () => {
	it("should return success result for successful operations", async () => {
		const [data, error] = await tryCatch(Promise.resolve("success"));

		expect(error).toBeNull();
		expect(data).toBe("success");
	});

	it("should return error result for failed operations", async () => {
		const [data, error] = await tryCatch(
			Promise.reject(new Error("Test error")),
		);

		expect(data).toBeNull();
		expect(error).toBeInstanceOf(Error);
		expect((error as Error).message).toBe("Test error");
	});

	it("should handle synchronous operations", async () => {
		const [data, error] = await tryCatch(Promise.resolve(42));

		expect(error).toBeNull();
		expect(data).toBe(42);
	});

	it("should handle different error types", async () => {
		const [data, error] = await tryCatch(Promise.reject("string error"));

		expect(data).toBeNull();
		expect(error).toBeDefined();
		expect(error).toBe("string error");
	});

	it("should handle objects as results", async () => {
		const obj = { id: 1, name: "test" };
		const [data, error] = await tryCatch(Promise.resolve(obj));

		expect(error).toBeNull();
		expect(data).toEqual(obj);
	});
});

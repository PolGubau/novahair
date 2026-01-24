import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useClipboard } from "./use-clipboard";

// Mock navigator.clipboard
Object.assign(navigator, {
	clipboard: {
		writeText: vi.fn(),
	},
});

describe("useClipboard", () => {
	it("should copy text to clipboard using modern API", async () => {
		const { result } = renderHook(() => useClipboard());

		await act(async () => {
			await result.current.copyToClipboard("test text");
		});

		expect(navigator.clipboard.writeText).toHaveBeenCalledWith("test text");
		expect(result.current.isCopied).toBe(true);
	});

	it("should set isCopied to false after 2 seconds", async () => {
		vi.useFakeTimers();
		const { result } = renderHook(() => useClipboard());

		await act(async () => {
			await result.current.copyToClipboard("test text");
		});

		expect(result.current.isCopied).toBe(true);

		act(() => {
			vi.advanceTimersByTime(2000);
		});

		expect(result.current.isCopied).toBe(false);
		vi.useRealTimers();
	});

	it("should handle clipboard API errors", async () => {
		const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
		vi.mocked(navigator.clipboard.writeText).mockRejectedValue(
			new Error("Clipboard error"),
		);

		const { result } = renderHook(() => useClipboard());

		await act(async () => {
			await result.current.copyToClipboard("test text");
		});

		expect(consoleSpy).toHaveBeenCalledWith(
			"Failed to copy text: ",
			expect.any(Error),
		);
		expect(result.current.isCopied).toBe(false);

		consoleSpy.mockRestore();
	});

	it("should use fallback method when clipboard API is not available", async () => {
		// Mock navigator.clipboard as undefined
		const originalClipboard = navigator.clipboard;
		// biome-ignore lint/suspicious/noExplicitAny: okay for test
		// biome-ignore lint/performance/noDelete: okay for test
		delete (navigator as any).clipboard;

		const execCommandSpy = vi
			.spyOn(document, "execCommand")
			.mockReturnValue(true);

		const { result } = renderHook(() => useClipboard());

		await act(async () => {
			await result.current.copyToClipboard("fallback text");
		});

		expect(execCommandSpy).toHaveBeenCalledWith("copy");
		expect(result.current.isCopied).toBe(true);

		// Restore
		// biome-ignore lint/suspicious/noExplicitAny: okay for test
		(navigator as any).clipboard = originalClipboard;
		execCommandSpy.mockRestore();
	});
});

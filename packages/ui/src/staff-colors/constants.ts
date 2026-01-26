/**
 * Curated set of colors for staff scheduling
 * These colors provide good contrast with white text and are visually distinct
 */

import type { TranslationKey } from "@novahair/utils";

export type StaffColor = {
	name: TranslationKey;
	hex: string;
};

export const STAFF_COLORS: StaffColor[] = [
	{ name: "blue", hex: "#2563eb" },
	{ name: "green", hex: "#16a34a" },
	{ name: "purple", hex: "#9333ea" },
	{ name: "red", hex: "#dc2626" },
	{ name: "orange", hex: "#ea580c" },
	{ name: "pink", hex: "#db2777" },
	{ name: "indigo", hex: "#4f46e5" },
	{ name: "teal", hex: "#0d9488" },
	{ name: "cyan", hex: "#0891b2" },
	{ name: "emerald", hex: "#059669" },
	{ name: "lime", hex: "#65a30d" },
	{ name: "amber", hex: "#d97706" },
	{ name: "rose", hex: "#e11d48" },
	{ name: "violet", hex: "#7c3aed" },
	{ name: "sky", hex: "#0284c7" },
	{ name: "slate", hex: "#475569" },
] as const;
export const getStaffColorByName = (name: string): StaffColor | undefined => {
	return STAFF_COLORS.find((color) => color.name === name);
};

export const getStaffColorByHex = (hex: string): StaffColor | undefined => {
	return STAFF_COLORS.find((color) => color.hex === hex);
};

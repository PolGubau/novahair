export const defaultNS = "common";
export const allLocales = ["en", "es"] as const;

export type Locale = (typeof allLocales)[number];
export const defaultLocale = allLocales[0];

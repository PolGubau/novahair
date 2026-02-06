import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { initReactI18next } from "react-i18next";
import { allLocales, defaultLocale, defaultNS, i18nCookieName } from "@novahair/utils";
// Import JSON files directly from utils package to ensure they're bundled in production
import commonEn from "../../../../../packages/utils/src/i18n/locales/en.json";
import commonEs from "../../../../../packages/utils/src/i18n/locales/es.json";

import adminEn from "./locales/en.json" with { type: "json" };
import adminEs from "./locales/es.json" with { type: "json" };

// Build resources object with imported JSON
export const resources = {
	en: {
		common: {...commonEn, ...adminEn},
	},
	es: {
		common: {...commonEs, ...adminEs},
	},
} as const;

export const i18nCookieName_admin = i18nCookieName;

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		initImmediate: true,
		defaultNS,
		fallbackLng: defaultLocale,
		supportedLngs: allLocales,
		detection: {
			order: ["cookie"],
			lookupCookie: i18nCookieName,
			caches: ["cookie"],
			cookieMinutes: 60 * 24 * 365, // 1 year
		},

		interpolation: { escapeValue: false },
		resources,
	});

export default i18n;

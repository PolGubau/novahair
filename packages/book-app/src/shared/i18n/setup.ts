import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { allLocales, defaultLocale, defaultNS, i18nCookieName } from "@novahair/utils";
import { initReactI18next } from "react-i18next";
// Import JSON files directly to ensure they're bundled in production
import commonEn from "@novahair/utils/i18n/locales/en.json";
import commonEs from "@novahair/utils/i18n/locales/es.json";

// Build resources object with imported JSON
export const resources = {
	en: {
		common: commonEn,
	},
	es: {
		common: commonEs,
	},
} as const;

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		initImmediate: true,
		defaultNS: defaultNS,
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

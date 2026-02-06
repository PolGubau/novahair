import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { allLocales, defaultLocale, defaultNS, i18nCookieName } from "@novahair/utils";
import { initReactI18next } from "react-i18next";
// Import common translations from utils
import commonEn from "../../../../../packages/utils/src/i18n/locales/en.json";
import commonEs from "../../../../../packages/utils/src/i18n/locales/es.json";

// Import app-specific translations
import bookAppEn from "../../i18n/locales/en.json" with { type: "json" };
import bookAppEs from "../../i18n/locales/es.json" with { type: "json" };

// Merge common and app-specific translations (app-specific override common if there are conflicts)
export const resources = {
	en: {
		common: { ...commonEn, ...bookAppEn },
	},
	es: {
		common: { ...commonEs, ...bookAppEs },
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

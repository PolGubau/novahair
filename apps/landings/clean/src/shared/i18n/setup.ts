import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { initReactI18next } from "react-i18next";
import { allLocales, defaultLocale, defaultNS } from "./constants";
import commonEn from "./locales/en.json";
import commonEs from "./locales/es.json";
import { resources } from "@novahair/utils";

export const localizationResources = {
 	en: {
		translation: commonEn.translation,
		common: resources.en.common,
	},
	es: {
		translation: commonEs.translation,
		common: resources.es.common,
	},
} as const;

export const i18nCookieName = "novahair_i18n";
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
		resources: localizationResources,
	});

export default i18n;

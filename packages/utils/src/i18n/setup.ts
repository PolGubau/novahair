import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { initReactI18next } from "react-i18next";
import commonEn from "./locales/en.json";
import commonEs from "./locales/es.json";

export const defaultNS = "common";

export const resources = {
	en: {
		common: commonEn,
	},
	es: {
		common: commonEs,
	},
} as const;

export type TranslationKey = keyof typeof commonEn;

const keys = Object.keys(commonEn) as (keyof typeof commonEn)[];
export const translationKeys = keys.reduce(
	(acc, key) => {
		acc[key] = key;
		return acc;
	},
	{} as Record<keyof typeof commonEn, keyof typeof commonEn>,
);

export const i18nCookieName = "novahair_i18n";
i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		debug: false,
		defaultNS,
		fallbackLng: "en",
		supportedLngs: ["en", "es"],
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

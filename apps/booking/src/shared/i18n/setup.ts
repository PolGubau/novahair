import i18n, { type t } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { initReactI18next } from "react-i18next";
import ca from "./locales/ca.json" with { type: "json" };
import en from "./locales/en.json" with { type: "json" };
import es from "./locales/es.json" with { type: "json" };

export const defaultNS = "common";

export const resources = {
	en: {
		common: en,
	},
	es: {
		common: es,
	},
	ca: {
		common: ca,
	},
} as const;

declare module "i18next" {
	interface CustomTypeOptions {
		defaultNS: typeof defaultNS;
		resources: typeof resources.en;
	}
}

export type TranslationKey = keyof typeof en;

const keys = Object.keys(en) as (keyof typeof en)[];
export const translationKeys = keys.reduce(
	(acc, key) => {
		acc[key] = key;
		return acc;
	},
	{} as Record<keyof typeof en, keyof typeof en>,
);

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		debug: false,
		defaultNS,
		fallbackLng: "en",

		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		},
		resources,
	});

export default i18n;

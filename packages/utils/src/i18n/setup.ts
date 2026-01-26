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

declare module "i18next" {
	interface CustomTypeOptions {
		defaultNS: typeof defaultNS;
		resources: typeof resources.en;
	}
}

export type TranslationKey = keyof typeof commonEn;

const keys = Object.keys(commonEn) as (keyof typeof commonEn)[];
export const translationKeys = keys.reduce(
	(acc, key) => {
		acc[key] = key;
		return acc;
	},
	{} as Record<keyof typeof commonEn, keyof typeof commonEn>,
);

let i18nPromise: Promise<void>;

i18n
	.use(initReactI18next)
	.use(LanguageDetector)
	.init(
		{
			debug: false,
			defaultNS,
			fallbackLng: "en",

			interpolation: {
				escapeValue: false, // not needed for react as it escapes by default
			},
			resources,
		},
		(err) => {
			if (err) {
				console.error("i18n initialization error:", err);
				i18nPromise = Promise.reject(err);
			} else {
				console.log("i18n initialized successfully");
				i18nPromise = Promise.resolve();
			}
		},
	);

export { i18nPromise };
export default i18n;

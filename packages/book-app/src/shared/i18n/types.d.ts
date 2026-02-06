import "i18next";
import type { defaultNS } from "@novahair/utils/i18n/constants";
import type commonEn from "@novahair/utils/i18n/locales/en.json";
import type bookAppEn from "../../i18n/locales/en.json";

// Merge common and book-app translations for TypeScript
type MergedTranslations = typeof commonEn & typeof bookAppEn;

declare module "i18next" {
	interface CustomTypeOptions {
		defaultNS: typeof defaultNS;
		resources: {
			common: MergedTranslations;
		};
	}
}

export type TranslationKey = keyof MergedTranslations;


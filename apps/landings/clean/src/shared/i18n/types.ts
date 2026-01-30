import "i18next";
import type { defaultNS } from "./constants";
import commonEn from "./locales/en.json";
import { resources } from "@novahair/utils";

declare module "i18next" {
	interface CustomTypeOptions {
		defaultNS: typeof defaultNS;
		resources: {
			translation: typeof commonEn.translation;
			common: typeof resources.en.common;
		};
	}
}

export type TranslationKey = keyof typeof commonEn.translation;

const keys = Object.keys(commonEn.translation) as (keyof typeof commonEn.translation)[];
export const translationKeys = keys.reduce(
	(acc, key) => {
		acc[key] = key;
		return acc;
	},
	{} as Record<keyof typeof commonEn.translation, keyof typeof commonEn.translation>,
);

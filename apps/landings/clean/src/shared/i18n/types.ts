import "i18next";
import type { defaultNS } from "./constants";
import commonEn from "./locales/en.json";

declare module "i18next" {
	interface CustomTypeOptions {
		defaultNS: typeof defaultNS;
		resources: {
			translation: typeof commonEn.translation;
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
	{} as Record<keyof typeof commonEn, keyof typeof commonEn>,
);

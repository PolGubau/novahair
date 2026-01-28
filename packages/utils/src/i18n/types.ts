import commonEn from "./locales/en.json";

export type TranslationKey = keyof typeof commonEn;

const keys = Object.keys(commonEn) as (keyof typeof commonEn)[];
export const translationKeys = keys.reduce(
	(acc, key) => {
		acc[key] = key;
		return acc;
	},
	{} as Record<keyof typeof commonEn, keyof typeof commonEn>,
);

import {  i18nCookieName } from "@novahair/utils";
import { defaultLocale } from "@novahair/utils/i18n/constants";
import i18n from "@novahair/utils/i18n/setup";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";

export const setSSRLanguage = createIsomorphicFn().server(async () => {
	let language = getCookie(i18nCookieName) 
	if (!language) {
		language = defaultLocale;
		setCookie(i18nCookieName, language, {
			maxAge: 60 * 24 * 365, // 1 year
			path: "/",
		});
	}
	console.debug("SSR Language detected:", language);
	if (language !== i18n.language) {
		await i18n.changeLanguage(language, () => {
			console.debug("Language changed in server");
		});
	}
	return language;
});

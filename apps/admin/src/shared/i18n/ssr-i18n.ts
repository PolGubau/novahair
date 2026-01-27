import { i18nCookieName } from "@novahair/utils";
import i18n from "@novahair/utils/i18n/setup";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";

export const setSSRLanguage = createIsomorphicFn().server(async () => {
	const language = getCookie(i18nCookieName);
	console.debug("SSR Language detected:", language);
	if (language !== i18n.language) {
		await i18n.changeLanguage(language || "en", () => {
			console.debug("Language changed in server");
		});
	}
});

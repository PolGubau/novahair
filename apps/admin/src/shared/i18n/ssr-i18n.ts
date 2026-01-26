import i18n from "i18next";

import { i18nCookieName } from "@novahair/utils";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";

export const setSSRLanguage = createIsomorphicFn().server(async () => {
	const language = getCookie(i18nCookieName);
	await i18n.changeLanguage(language || "en");
});

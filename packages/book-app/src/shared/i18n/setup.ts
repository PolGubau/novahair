import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { allLocales, defaultLocale, defaultNS, i18nCookieName, resources } from "@novahair/utils";
import { initReactI18next } from "react-i18next";
  
 i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
 		initImmediate: true,
 		defaultNS:defaultNS,
		fallbackLng: defaultLocale,
		supportedLngs: allLocales,
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

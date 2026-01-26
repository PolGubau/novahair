import "i18next";
import type translation from "./locales/en.json";
import type { defaultNS } from "./setup";

declare module "i18next" {
	interface CustomTypeOptions {
		defaultNS: typeof defaultNS;
		resources: {
			common: typeof translation;
		};
	}
}

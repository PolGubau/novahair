import "i18next";
import type { defaultNS } from "./constants";
import commonEn from "./locales/en.json";

declare module "i18next" {
	interface CustomTypeOptions {
		defaultNS: typeof defaultNS;
		resources: {
			common: typeof commonEn;
		};
	}
}
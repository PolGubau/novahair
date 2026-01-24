import { defineConfig } from "i18next-cli";
export default defineConfig({
	locales: ["en", "es"],
	types: {
		input: ["src/shared/i18n/locales/en.json"],
		output: "src/types/i18next.d.ts",
		resourcesFile: "src/types/resources.d.ts",
		enableSelector: true,
	},
	extract: {
		mergeNamespaces: true,
		input: "src/**/*.{js,jsx,ts,tsx}",
		output: "src/shared/i18n/locales/{{language}}.json",
	},
 
});


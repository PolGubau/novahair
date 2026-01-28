import { defineConfig } from "i18next-cli";
export default defineConfig({
	locales: ["en", "es" ],
	types: {
 		input: ["./src/i18n/locales/en.json"],
		output: "./src/i18n/types/i18next.d.ts",
		resourcesFile: "./src/i18n/types/resources.d.ts",
		enableSelector: true,
	},
	extract: {
		mergeNamespaces: true,
		input: "src/**/*.{js,jsx,ts,tsx}",
		output: "./src/i18n/locales/{{language}}.json",
	},
});


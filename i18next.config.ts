import { defineConfig } from "i18next-cli";
export default defineConfig({
	locales: ["en", "es", "ca"],
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
	lint: {
		rules: {
			hardcodedStrings: {
				enabled: true,
				exclude: [
					// Excluir componentes UI base que usan data-slots
					"**/shared/ui/**",
					// Excluir rutas de administración con valores técnicos
					"**/routes/admin/layout.tsx",
					// Excluir máscaras SVG y valores técnicos
					"**/masked-image.tsx",
					"**/squicircle.tsx",
				],
			},
		},
	},
});


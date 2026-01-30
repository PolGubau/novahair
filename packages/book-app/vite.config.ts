import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
	plugins: [
		// this is the plugin that enables path aliases
		viteTsConfigPaths({
			projects: ["./tsconfig.json"],
		}),
		tailwindcss(),
		viteReact(),
	],
	build: {
		outDir: "dist",
		lib: {
			entry: "./src/index.ts",
			name: "BookingApp",
			fileName: "booking-app",
		},
		rollupOptions: {
			external: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-query", "i18next", "@novahair/client", "@novahair/ui", "@novahair/utils"],
			output: {
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
					"@tanstack/react-router": "TanStackRouter",
					"@tanstack/react-query": "TanStackQuery",
					i18next: "i18next",
					"@novahair/client": "NovahairClient",
					"@novahair/ui": "NovahairUI",
					"@novahair/utils": "NovahairUtils",
				},
			},
		},
	},
});

export default config;

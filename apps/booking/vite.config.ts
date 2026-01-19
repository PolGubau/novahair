import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
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
		tanstackStart({
			router: {
				routeToken: "layout",
			},
		}),
		viteReact(),
	],
	build: {
		outDir: "dist",
	},
	server: {
		proxy: {
			"/api": {
				target: "https://api.gerardmartinez.es",
				changeOrigin: true,
				secure: false,
				configure: (proxy, options) => {
					proxy.on("error", (err, _req, _res) => {
						console.log("proxy error", err);
					});
					proxy.on("proxyReq", (proxyReq, req) => {
						console.debug(
							"Proxying:",
							req.method,
							req.url,
							"→",
							options.target + proxyReq.path,
						);
					});
					proxy.on("proxyRes", (proxyRes, req) => {
						console.log("Response:", proxyRes.statusCode, req.url);
					});
				},
			},
		},
	},
});

export default config;

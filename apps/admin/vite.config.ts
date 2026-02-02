import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";

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
		nitro(),
		viteReact(),
		VitePWA({
			registerType: "autoUpdate",
			includeAssets: ["favicon.svg", "logo192.png", "logo512.png", "robots.txt"],
			manifest: {
				name: "NovaHair Admin - Gestión de Peluquería",
				short_name: "NovaHair Admin",
				description: "Panel de administración profesional para gestión de salones de belleza",
				theme_color: "#000000",
				background_color: "#ffffff",
				display: "standalone",
				orientation: "portrait",
				scope: "/",
				start_url: "/",
				categories: ["business", "productivity"],
				icons: [
					{
						src: "favicon.svg",
						sizes: "any",
						type: "image/svg+xml",
						purpose: "any",
					},
					{
						src: "logo192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "any maskable",
					},
					{
						src: "logo512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any maskable",
					},
				],
				shortcuts: [
					{
						name: "Dashboard",
						short_name: "Dashboard",
						description: "Ver métricas del negocio",
						url: "/",
						icons: [{ src: "logo192.png", sizes: "192x192" }],
					},
					{
						name: "Citas",
						short_name: "Citas",
						description: "Gestionar citas",
						url: "/appointments",
						icons: [{ src: "logo192.png", sizes: "192x192" }],
					},
					{
						name: "Equipo",
						short_name: "Equipo",
						description: "Gestionar equipo",
						url: "/team",
						icons: [{ src: "logo192.png", sizes: "192x192" }],
					},
				],
			},
			workbox: {
				globPatterns: ["**/*.{js,css,html,ico,png,svg,woff,woff2}"],
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/api\.gerardmartinez\.es\/api\/.*/i,
						handler: "NetworkFirst",
						options: {
							cacheName: "api-cache",
							expiration: {
								maxEntries: 100,
								maxAgeSeconds: 60 * 60 * 24, // 24 hours
							},
							cacheableResponse: {
								statuses: [0, 200],
							},
							networkTimeoutSeconds: 10,
						},
					},
					{
						urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
						handler: "CacheFirst",
						options: {
							cacheName: "google-fonts-cache",
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
							},
							cacheableResponse: {
								statuses: [0, 200],
							},
						},
					},
					{
						urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
						handler: "CacheFirst",
						options: {
							cacheName: "images-cache",
							expiration: {
								maxEntries: 60,
								maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
							},
						},
					},
				],
				cleanupOutdatedCaches: true,
				skipWaiting: true,
				clientsClaim: true,
			},
			devOptions: {
				enabled: true,
				type: "module",
			},
		}),
	],
	build: {
		outDir: "dist",
	},
	server: {
		port: 3000,
		proxy: {
			"/api": {
				target: "https://api.gerardmartinez.es/api",
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

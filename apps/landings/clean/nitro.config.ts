import { defineNitroConfig } from "nitro/config";

export default defineNitroConfig({
	preset: "vercel",
	serveStatic: true,
	output: {
		dir: ".vercel/output",
		serverDir: ".vercel/output/functions/__nitro.func",
		publicDir: ".vercel/output/static",
	},
});

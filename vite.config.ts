import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'


const config = defineConfig({
  plugins: [
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart({
      router:{
        routeToken: 'layout',
      }
    }),
    viteReact(),
    nitro(),
  ],    
  build: {
    outDir: "dist",
  },
  server: {

    proxy: {
      '/api': {
        target: 'https://api.gerardmartinez.es',
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            console.debug('Proxying:', req.method, req.url, '→', options.target + proxyReq.path);
          });
        },
      },
    },
  },
})

export default config




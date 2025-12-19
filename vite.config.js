import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import {resolve, dirname} from "path";
import {fileURLToPath} from "url";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@': resolve(dirname(fileURLToPath(import.meta.url)), 'src'),
            '#components': resolve(dirname(fileURLToPath(import.meta.url)), 'src/components'),
            '#constants': resolve(dirname(fileURLToPath(import.meta.url)), 'src/constants'),
            '#store': resolve(dirname(fileURLToPath(import.meta.url)), 'src/store'),
            '#hoc': resolve(dirname(fileURLToPath(import.meta.url)), 'src/hoc'),
            '#windows': resolve(dirname(fileURLToPath(import.meta.url)), 'src/windows'),
        }
    },
    server: {
        proxy: {
            // Forward /api/* requests from Vite dev server to your local PHP server
            // Adjust target if your PHP is hosted elsewhere (e.g., http://localhost:8080)
            '/api': {
                target: 'http://localhost:8000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
})

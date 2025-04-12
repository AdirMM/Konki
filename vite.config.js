import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Konki/', // Nombre de tu repositorio
  plugins: [react(), tailwindcss()],
  build: {
    minify: 'esbuild', // o 'terser' si necesitas más compresión
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: '/Konki/', // Nombre de tu repositorio
  plugins: [react()],
})

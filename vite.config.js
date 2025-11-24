import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: Set base path for GitHub Pages deployment
  base: '/', 
  server: {
    hmr: {
      clientPort: 443,
    },
    allowedHosts: [
      '.ngrok-free.app'
    ],
  },
  // --- CRITICAL FIX FOR IMPORT.META WARNING ---
  // Explicitly forcing the build environment to recognize ES2020 features.
  esbuild: {
    supported: {
      'import-meta': true
    },
    target: 'es2020'
  },
  build: {
    target: 'es2020', // Ensure modern output
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'framer-motion', 'lucide-react'],
        }
      }
    }
  }
})
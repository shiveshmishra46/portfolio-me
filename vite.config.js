import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcssPostcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcssPostcss,
        autoprefixer
      ],
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three', '@react-three/fiber', '@react-three/drei'],
          'gsap': ['gsap', '@gsap/react'],
          'vendor': ['react', 'react-dom']
        }
      }
    },
    target: 'es2015', // Better browser support
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Console logs remove kar do production mein
        drop_debugger: true
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'three']
  }
});
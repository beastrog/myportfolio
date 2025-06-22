import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'react-helmet-async': 'react-helmet-async',
    },
  },
  build: {
    target: 'es2020',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // manualChunks: (id) => {
        //   if (id.includes('node_modules')) {
        //     if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
        //       return 'vendor-react';
        //     }
        //     if (id.includes('@vercel/analytics') || id.includes('@vercel/speed-insights')) {
        //       return 'vercel';
        //     }
        //     if (id.includes('react-router')) {
        //       return 'vendor-router';
        //     }
        //     return 'vendor-other';
        //   }
        // },
      },
    },
    chunkSizeWarningLimit: 1000,
    commonjsOptions: {
      include: [/node_modules/],
      extensions: ['.js', '.cjs'],
      transformMixedEsModules: true
    }
  },
  define: {
    'process.env': {
      ...Object.entries(process.env).reduce((acc, [key, val]) => {
        if (key.startsWith('VITE_')) {
          acc[key] = `"${val}"`;
        }
        return acc;
      }, {}),
      NODE_ENV: `"${process.env.NODE_ENV || 'development'}"`,
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-helmet-async'],
    esbuildOptions: {
      target: 'es2020',
      supported: { 
        bigint: true
      },
    },
  },
  ssr: {
    noExternal: ['react-helmet-async'],
  },
});

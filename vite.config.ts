import { defineConfig, loadEnv, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }): UserConfig => {
  // Load env file based on `mode` in the current directory
  const env = loadEnv(mode, process.cwd(), '');
  const isProduction = mode === 'production';
  const base = isProduction ? '/' : '/';
  
  // Environment variables that should be exposed to the client
  const envWithProcessPrefix = {
    'process.env.NODE_ENV': JSON.stringify(mode),
    'process.env.VITE_API_BASE_URL': JSON.stringify(env.VITE_API_BASE_URL || ''),
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify(env.VITE_API_BASE_URL || ''),
  };
  
  return {
    base,
    server: {
      host: '::',
      port: 3000,
      strictPort: true,
      proxy: {
        // Proxy API requests to the backend server in development
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    preview: {
      port: 3000,
      strictPort: true,
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: isProduction ? 'hidden' : true,
      minify: isProduction ? 'esbuild' : false,
      cssMinify: isProduction,
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash][extname]',
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
    },
    plugins: [
      react(),
      // Visualize bundle size in production
      isProduction && visualizer({
        open: false,
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
      }),
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    // Expose env variables to the client
    define: {
      ...envWithProcessPrefix,
      'process.env': {
        ...Object.entries(env).reduce((acc, [key, val]) => {
          if (key.startsWith('VITE_')) {
            acc[key] = JSON.stringify(val);
          }
          return acc;
        }, {} as Record<string, string>),
      },
    },
    // Optimize dependencies for faster development
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
      esbuildOptions: {
        target: 'es2020',
      },
    },
    // Enable CSS modules
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
    },
    // Clear screen for better logging
    clearScreen: true,
    // Enable source maps in development
    esbuild: {
      drop: isProduction ? ['console', 'debugger'] : [],
    }
  };
});

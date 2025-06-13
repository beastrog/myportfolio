import { defineConfig, loadEnv, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }): UserConfig => {
  const env = loadEnv(mode, process.cwd(), '');
  const isProduction = mode === 'production';
  
  return {
    base: '/',
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'dist',
      assetsDir: 'assets',
      minify: 'esbuild',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'router': ['react-router-dom'],
            'vercel': ['@vercel/analytics', '@vercel/speed-insights'],
          },
        },
      },
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
      'process.env.VITE_API_BASE_URL': JSON.stringify(env.VITE_API_BASE_URL || ''),
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@vercel/analytics',
        '@vercel/speed-insights'
      ],
    },
  };
});

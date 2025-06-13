import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  const isProduction = mode === 'production';
  const base = isProduction ? '/' : '/';
  
  return {
    base,
    server: {
      host: "::",
      port: 8080,
    },
    preview: {
      port: 8080,
      strictPort: true,
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].[hash].js`,
          chunkFileNames: `assets/[name].[hash].js`,
          assetFileNames: `assets/[name].[hash].[ext]`
        }
      }
    },
    plugins: [
      react(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Expose env variables to the client
    define: {
      'process.env.RESEND_API_KEY': JSON.stringify(env.RESEND_API_KEY),
      'process.env.EMAIL_TO': JSON.stringify(env.EMAIL_TO),
      'process.env.EMAIL_FROM': JSON.stringify(env.EMAIL_FROM),
    }
  };
});

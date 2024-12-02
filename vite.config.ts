import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  server: {
    // Use Vite's built-in history fallback middleware
    port: 3000,
    open: true,
    cors: true,
    fs: {
      strict: false,
    },
    hmr: {
      overlay: true,
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Customize output settings if necessary
      },
    },
  },
  preview: {
    port: 5000,
    open: true,
    cors: true,
  },
});

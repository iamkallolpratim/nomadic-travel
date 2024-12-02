import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  build: {
    // Ensure fallback works in the production build
    rollupOptions: {
      output: {
        // Configure output settings if needed
      },
    },
  },
  // Ensure preview also serves index.html for all routes
  preview: {
    headers: {},
  },
});

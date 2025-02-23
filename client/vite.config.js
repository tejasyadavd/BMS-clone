import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 1200,
    // rollupOptions: {
    //   output: {
    //     manualChunks(id) {
    //       if (id.includes("node_modules")) {
    //         if (id.includes("react")) return "react-vendor";
    //         if (id.includes("lodash")) return "lodash";
    //         return "vendor";
    //       }
    //     },
    //   },
    //},
    server: {
      historyApiFallback: true,
    },
  },
});

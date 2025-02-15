import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: process.env.VITE_API_BASE_URL, // Backend server URL
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // },
});

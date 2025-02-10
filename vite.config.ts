import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {},
    global: 'window', // `global` কে `window` দিয়ে প্রতিস্থাপন করুন
  },
  server: {
    host: true,
    port: 5173,
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      "webdev-production-e888.up.railway.app",
      ".up.railway.app",
      ".railway.app"
    ]
  },
  preview: {
    host: "0.0.0.0",
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      "webdev-production-e888.up.railway.app",
      ".up.railway.app",
      ".railway.app"
    ]
  }
});

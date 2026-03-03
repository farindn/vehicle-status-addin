import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync } from "fs";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "copy-bridge",
      closeBundle() {
        copyFileSync("bridge.html", "dist/bridge.html");
      },
    },
  ],
  base: "/vehicle-status-addin/",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "dashboard.html",
    },
  },
});

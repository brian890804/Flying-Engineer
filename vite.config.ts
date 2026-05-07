import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    sourcemap: false,
  },
  resolve: {
    alias: {
      "~assets": path.resolve(__dirname, "./src/assets"),
      "~utils": path.resolve(__dirname, "./src/utils"),
      "~pages": path.resolve(__dirname, "./src/pages"),
      "~components": path.resolve(__dirname, "./src/components"),
      "~hooks": path.resolve(__dirname, "./src/hooks"),
    },
  },
});

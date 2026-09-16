import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import packageJson from "./package.json" with { type: "json" };

const base = "/trip/";

function shanghaiBuildId(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
    .formatToParts(date)
    .reduce<Record<string, string>>((values, part) => {
      values[part.type] = part.value;
      return values;
    }, {});
  return `${parts.year}${parts.month}${parts.day}-${parts.hour}${parts.minute} CST`;
}

export default defineConfig(({ command }) => ({
  base,
  define: {
    "import.meta.env.VITE_APP_VERSION": JSON.stringify(packageJson.version),
    "import.meta.env.VITE_BUILD_ID": JSON.stringify(
      command === "build" ? shanghaiBuildId() : "DEV",
    ),
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      includeAssets: ["icons/*.png", "covers/*.svg"],
      manifest: {
        id: base,
        name: "旅记",
        short_name: "旅记",
        description: "用一个预算，开启一段美好的旅程。",
        start_url: base,
        scope: base,
        display: "standalone",
        lang: "zh-CN",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        icons: [
          {
            src: `${base}icons/icon-192.png`,
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: `${base}icons/icon-512.png`,
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: `${base}icons/maskable-512.png`,
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,webmanifest}"],
        navigateFallback: `${base}index.html`,
        navigateFallbackAllowlist: [/^\/trip\//],
        cleanupOutdatedCaches: true,
      },
    }),
  ],
  build: { target: "es2022" },
}));

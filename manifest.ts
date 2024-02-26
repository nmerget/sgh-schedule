import { ManifestOptions } from "vite-plugin-pwa";

const manifest: Partial<ManifestOptions> = {
  name: "SGH Schedule",
  short_name: "sgh-schedule",
  description: "Simple app to see current sport matches",
  start_url: "/sgh-schedule/",
  display: "standalone",
  background_color: "#ffffff",
  theme_color: "#017731",
  lang: "de",
  scope: "/",
  icons: [
    {
      src: "/right/icons/manifest-icon-192.maskable.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "any maskable",
    },
    {
      src: "/right/icons/manifest-icon-512.maskable.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any maskable",
    },
  ],
};

export default manifest;

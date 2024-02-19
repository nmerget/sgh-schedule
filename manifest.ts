import { ManifestOptions } from "vite-plugin-pwa";

const manifest: Partial<ManifestOptions> = {
  name: "React in GitHub template",
  short_name: "RiGHt",
  description: "TODO: Change me :)",
  start_url: "/right/",
  display: "standalone",
  background_color: "#ffffff",
  theme_color: "#000000",
  lang: "en",
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

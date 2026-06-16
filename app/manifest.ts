import type { MetadataRoute } from "next";
import { brand } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${brand.name} — клиника медицинской косметологии`,
    short_name: brand.name,
    description: "Премиальная косметология в Иванове. Запись онлайн.",
    start_url: "/",
    display: "standalone",
    background_color: "#F6F4EF",
    theme_color: "#F6F4EF",
    lang: "ru",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}

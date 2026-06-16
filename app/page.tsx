import { SiteExperienceV2 } from "@/components/v2/SiteExperienceV2";
import { JsonLd } from "@/components/JsonLd";
import { ruClinicSchema } from "@/lib/schema";

// Главная страница — версия со scroll-3D-пространством и интро.
export default function Home() {
  return (
    <>
      <JsonLd data={ruClinicSchema} />
      <SiteExperienceV2 />
    </>
  );
}

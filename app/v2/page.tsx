import type { Metadata } from "next";
import { SiteExperienceV2 } from "@/components/v2/SiteExperienceV2";
import { JsonLd } from "@/components/JsonLd";
import { ruClinicSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Клиника медицинской косметологии в Иванове",
  description:
    "Премиальная клиника «Код Молодости» в Иванове: инъекционная и аппаратная косметология, контурная пластика, лазерная эпиляция. Запись онлайн.",
  alternates: { canonical: "/v2" },
};

export default function V2() {
  return (
    <>
      <JsonLd data={ruClinicSchema} />
      <SiteExperienceV2 locale="ru" />
    </>
  );
}

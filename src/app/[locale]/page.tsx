import { getTranslations } from "next-intl/server";
import { HomePage } from "@/components/HomePage";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const tHero = await getTranslations("Hero");
  const tServices = await getTranslations("Services");
  const tGeneral = await getTranslations("General");
  const tFooter = await getTranslations("Footer");

  return <HomePage tHero={tHero} tServices={tServices} tGeneral={tGeneral} tFooter={tFooter} locale={locale} />;
}

import * as React from "react";
import { Activity, Heart, ShieldAlert, Stethoscope, ArrowRight } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { HeartScene } from "./HeartScene";
import { HeartPawIllustration } from "./HeartPawIllustration";

export function HomePage({ tHero, tServices, tGeneral, tFooter, locale }: any) {
  return (
    <div className="min-h-screen bg-[#FAF9F7] dark:bg-[#020617] text-[#6B7280] dark:text-slate-300 font-sans">
      <header className="absolute top-0 w-full px-8 py-6 flex items-center justify-between z-50">
        <div className="flex items-center gap-4">
          <img
            src="/images/silvet-light.png"
            alt="Silvet"
            className="block dark:hidden h-20 w-auto"
          />
          <img
            src="/images/silvet-dark.png"
            alt="Silvet"
            className="hidden dark:block h-20 w-auto"
          />
          <span className="text-2xl font-light tracking-[0.2em] text-[#1C1C1E] dark:text-slate-100 font-[family-name:var(--font-logo)] italic">
            SILVET
          </span>
        </div>
        <div className="flex items-center gap-8">
          <React.Suspense fallback={<span className="text-xs font-light tracking-widest uppercase text-[#6B7280] dark:text-slate-300">{locale}</span>}>
            <LanguageSwitcher locale={locale} />
          </React.Suspense>
          <ThemeToggle />
          <a
            href={`/${locale}/book`}
            className="border border-[#D1D0CC] dark:border-slate-500/50 hover:bg-[#1C1C1E] hover:text-white dark:hover:bg-slate-100 dark:hover:text-[#020617] text-[#1C1C1E] dark:text-slate-100 px-6 py-2 text-xs font-light tracking-[0.1em] uppercase transition-all duration-500"
          >
            {tGeneral("title")}
          </a>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative min-h-screen flex flex-col justify-center px-8 lg:px-24">
          <div className="absolute inset-0 bg-gradient-to-b from-[#F5F3F0] via-[#FAF9F7] to-[#F5F3F0] dark:from-[#020617] dark:via-[#0f172a] dark:to-[#020617] z-0"></div>
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-300/25 dark:bg-blue-900/20 rounded-full blur-[120px] pointer-events-none z-0"></div>

          <div className="absolute inset-0 lg:inset-auto lg:right-0 lg:top-0 w-full lg:w-[60%] h-full lg:h-screen z-0 lg:z-[1] pointer-events-none overflow-hidden">
            <div className="w-full h-full opacity-[0.28] lg:opacity-100">
              <React.Suspense fallback={null}>
                <HeartScene />
              </React.Suspense>
            </div>
          </div>

          <div className="relative z-10 max-w-4xl">
            <h1 className="text-5xl lg:text-7xl text-[#1C1C1E] dark:text-slate-100 font-serif tracking-wide leading-tight mb-8">
              {tHero("title")}
            </h1>
            <p className="text-xl lg:text-2xl font-light tracking-wide text-[#6B7280] dark:text-slate-400 max-w-2xl leading-relaxed">
              {tHero("subtitle")}
            </p>
            <div className="mt-12">
              <a
                href={`/${locale}/book`}
                className="group inline-flex items-center gap-3 bg-[#1C1C1E] dark:bg-slate-100 text-white dark:text-[#020617] hover:bg-[#3A3A3C] dark:hover:bg-white px-8 py-4 text-sm font-light tracking-[0.15em] uppercase transition-all duration-500"
              >
                <span>{tHero("cta")}</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </section>

        <section className="py-24 px-8 lg:px-24 relative z-10 bg-[#FAF9F7] dark:bg-[#020617]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-[#E5E3DF] dark:bg-slate-800/50 border border-[#E5E3DF] dark:border-slate-800/50">
              <div className="md:col-span-12 lg:col-span-6 bg-white dark:bg-[#020617] p-12 flex flex-col justify-between group hover:bg-[#F5F3F0] dark:hover:bg-[#0f172a] transition-colors duration-500">
                <Activity className="h-10 w-10 text-[#9CA3AF] dark:text-slate-500 mb-24 group-hover:text-[#6B7280] dark:group-hover:text-slate-300 transition-colors duration-500" strokeWidth={1} />
                <div>
                  <h3 className="text-2xl text-[#1C1C1E] dark:text-slate-200 font-serif tracking-wide mb-4">{tServices("echocardiography.title")}</h3>
                  <p className="text-sm text-[#6B7280] dark:text-slate-500 tracking-wide font-light leading-loose">{tServices("echocardiography.description")}</p>
                </div>
              </div>

              <div className="hidden lg:flex lg:col-span-6 bg-white dark:bg-[#020617] items-center justify-center overflow-hidden relative">
                <div className="absolute w-72 h-72 bg-blue-300/25 dark:bg-blue-900/20 rounded-full blur-[100px]"></div>
                <div className="w-16 h-px bg-[#E5E3DF] dark:bg-slate-700/50"></div>
              </div>

              <div className="md:col-span-6 lg:col-span-3 bg-white dark:bg-[#020617] p-12 flex flex-col justify-between group hover:bg-[#F5F3F0] dark:hover:bg-[#0f172a] transition-colors duration-500">
                <Heart className="h-10 w-10 text-[#9CA3AF] dark:text-slate-500 mb-24 group-hover:text-[#6B7280] dark:group-hover:text-slate-300 transition-colors duration-500" strokeWidth={1} />
                <div>
                  <h3 className="text-2xl text-[#1C1C1E] dark:text-slate-200 font-serif tracking-wide mb-4">{tServices("cardiacScreening.title")}</h3>
                  <p className="text-sm text-[#6B7280] dark:text-slate-500 tracking-wide font-light leading-loose">{tServices("cardiacScreening.description")}</p>
                </div>
              </div>

              <div className="md:col-span-6 lg:col-span-3 bg-white dark:bg-[#020617] p-12 flex flex-col justify-between group hover:bg-[#F5F3F0] dark:hover:bg-[#0f172a] transition-colors duration-500">
                <Stethoscope className="h-10 w-10 text-[#9CA3AF] dark:text-slate-500 mb-24 group-hover:text-[#6B7280] dark:group-hover:text-slate-300 transition-colors duration-500" strokeWidth={1} />
                <div>
                  <h3 className="text-2xl text-[#1C1C1E] dark:text-slate-200 font-serif tracking-wide mb-4">{tServices("heartDiseaseManagement.title")}</h3>
                  <p className="text-sm text-[#6B7280] dark:text-slate-500 tracking-wide font-light leading-loose">{tServices("heartDiseaseManagement.description")}</p>
                </div>
              </div>

              <div className="hidden lg:flex lg:col-span-6 bg-white dark:bg-[#020617] items-center justify-center overflow-hidden relative">
                <div className="absolute w-60 h-60 bg-blue-300/15 dark:bg-blue-900/15 rounded-full blur-[100px]"></div>
                <HeartPawIllustration />
              </div>

              <div className="hidden lg:flex lg:col-span-6 bg-white dark:bg-[#020617] items-center justify-center overflow-hidden relative">
                <div className="absolute w-64 h-64 bg-emerald-300/20 dark:bg-emerald-900/20 rounded-full blur-[90px]"></div>
                <div className="w-24 h-px bg-[#E5E3DF] dark:bg-slate-700/50"></div>
              </div>

              <div className="md:col-span-12 lg:col-span-6 lg:col-start-7 bg-white dark:bg-[#020617] p-12 flex flex-col justify-between group hover:bg-[#F5F3F0] dark:hover:bg-[#0f172a] transition-colors duration-500">
                <ShieldAlert className="h-10 w-10 text-[#9CA3AF] dark:text-slate-500 mb-24 group-hover:text-[#6B7280] dark:group-hover:text-slate-300 transition-colors duration-500" strokeWidth={1} />
                <div>
                  <h3 className="text-2xl text-[#1C1C1E] dark:text-slate-200 font-serif tracking-wide mb-4">{tServices("emergencyCardiology.title")}</h3>
                  <p className="text-sm text-[#6B7280] dark:text-slate-500 tracking-wide font-light leading-loose">{tServices("emergencyCardiology.description")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-[#E5E3DF] dark:border-slate-800/50 bg-[#FAF9F7] dark:bg-[#020617]">
          <div className="max-w-7xl mx-auto px-8 lg:px-24 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <img src="/images/silvet-light.png" alt="Silvet" className="block dark:hidden h-8 w-auto" />
                  <img src="/images/silvet-dark.png" alt="Silvet" className="hidden dark:block h-8 w-auto" />
                  <span className="text-lg font-light tracking-[0.15em] text-[#1C1C1E] dark:text-slate-100 font-[family-name:var(--font-logo)] italic">SILVET</span>
                </div>
                <p className="text-sm text-[#6B7280] dark:text-slate-500 font-light leading-relaxed">
                  {tFooter("tagline")}
                </p>
              </div>
              <div>
                <h4 className="text-xs tracking-[0.2em] uppercase text-[#1C1C1E] dark:text-slate-200 font-medium mb-5">{tFooter("contact.title")}</h4>
                <div className="space-y-3 text-sm text-[#6B7280] dark:text-slate-500 font-light">
                  <p>{tFooter("contact.address")}</p>
                  <p>{tFooter("contact.phone")}</p>
                  <p>{tFooter("contact.email")}</p>
                </div>
              </div>
              <div>
                <h4 className="text-xs tracking-[0.2em] uppercase text-[#1C1C1E] dark:text-slate-200 font-medium mb-5">{tFooter("hours.title")}</h4>
                <div className="space-y-3 text-sm text-[#6B7280] dark:text-slate-500 font-light">
                  <div className="flex justify-between">
                    <span>{tFooter("hours.weekdays.label")}</span>
                    <span>{tFooter("hours.weekdays.value")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{tFooter("hours.saturday.label")}</span>
                    <span>{tFooter("hours.saturday.value")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{tFooter("hours.sunday.label")}</span>
                    <span className="text-[#9CA3AF] dark:text-slate-600">{tFooter("hours.sunday.value")}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-[#E5E3DF] dark:border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-[#9CA3AF] dark:text-slate-600 font-light">
                {tFooter("copyright", { year: new Date().getFullYear() })}
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

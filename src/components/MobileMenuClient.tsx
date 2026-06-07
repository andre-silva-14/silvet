"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function MobileMenuClient({
  locale,
  contactLabel,
  themeDarkLabel,
  themeLightLabel,
}: {
  locale: string;
  contactLabel: string;
  themeDarkLabel: string;
  themeLightLabel: string;
}) {
  const [open, setOpen] = React.useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-[#1C1C1E] dark:text-slate-100 p-2"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" strokeWidth={1.2} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-[90] bg-black/20 dark:bg-black/40" onClick={() => setOpen(false)} />
          <div className="fixed inset-x-4 top-24 z-[100] rounded-2xl bg-white dark:bg-[#0f172a] border border-[#E5E3DF] dark:border-slate-700/50 shadow-xl flex flex-col items-center gap-8 px-8 py-12">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-[#1C1C1E] dark:text-slate-100 p-2"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" strokeWidth={1.2} />
            </button>

            <React.Suspense fallback={<span className="text-sm text-[#6B7280] dark:text-slate-300">{locale}</span>}>
              <LanguageSwitcher locale={locale} />
            </React.Suspense>

            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="flex items-center gap-2 text-sm font-light tracking-widest uppercase text-[#6B7280] dark:text-slate-300 hover:text-[#1C1C1E] dark:hover:text-white transition-colors duration-300"
            >
              {mounted ? (
                resolvedTheme === "dark" ? (
                  <Sun className="h-4 w-4" strokeWidth={1.2} />
                ) : (
                  <Moon className="h-4 w-4" strokeWidth={1.2} />
                )
              ) : (
                <Sun className="h-4 w-4" strokeWidth={1.2} />
              )}
              <span>{mounted && (resolvedTheme === "dark" ? themeLightLabel : themeDarkLabel)}</span>
            </button>

            <a
              href={`/${locale}/contact`}
              onClick={() => setOpen(false)}
              className="border border-[#D1D0CC] dark:border-slate-500/50 hover:bg-[#1C1C1E] hover:text-white dark:hover:bg-slate-100 dark:hover:text-[#020617] text-[#1C1C1E] dark:text-slate-100 px-10 py-4 text-sm font-light tracking-[0.1em] uppercase transition-all duration-500"
            >
              {contactLabel}
            </a>
          </div>
        </>
      )}
    </>
  );
}

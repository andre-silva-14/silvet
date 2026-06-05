"use client";

import * as React from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { Globe, ChevronDown } from "lucide-react";

const locales = [
  { code: "pl", label: "PL", name: "Polski" },
  { code: "en", label: "EN", name: "English" },
  { code: "de", label: "DE", name: "Deutsch" },
  { code: "pt", label: "PT", name: "Português" },
];

export function LanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const switchTo = (code: string) => {
    const params = new URLSearchParams(searchParams.toString());
    router.replace(`${pathname}?${params.toString()}` as any, { locale: code });
    setOpen(false);
  };

  const current = locales.find((l) => l.code === locale) ?? locales[1];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs font-light tracking-widest uppercase text-[#6B7280] dark:text-slate-300 hover:text-[#1C1C1E] dark:hover:text-white transition-colors duration-300"
      >
        <Globe className="h-3.5 w-3.5" strokeWidth={1.2} />
        <span>{current.label}</span>
        <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`} strokeWidth={1.2} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700/50 rounded-lg shadow-xl shadow-black/10 overflow-hidden z-50">
          {locales.map((l) => (
            <button
              key={l.code}
              onClick={() => switchTo(l.code)}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-200 ${
                l.code === locale
                  ? "text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-800/50 font-medium"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/30"
              }`}
            >
              <span className="font-medium tracking-wide">{l.label}</span>
              <span className="ml-2 font-light text-xs opacity-60">{l.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

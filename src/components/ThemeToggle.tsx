"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="flex items-center gap-1.5 text-xs font-light tracking-widest uppercase text-[#6B7280] dark:text-slate-300 hover:text-[#1C1C1E] dark:hover:text-white transition-colors duration-300"
      aria-label="Toggle theme"
    >
      {mounted ? (
        resolvedTheme === "dark" ? (
          <Sun className="h-3.5 w-3.5" strokeWidth={1.2} />
        ) : (
          <Moon className="h-3.5 w-3.5" strokeWidth={1.2} />
        )
      ) : (
        <Sun className="h-3.5 w-3.5" strokeWidth={1.2} />
      )}
    </button>
  );
}

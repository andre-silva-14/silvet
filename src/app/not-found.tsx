"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const translations: Record<string, { title: string; description: string; cta: string }> = {
  pl: { title: "Strona nie znaleziona", description: "Przepraszamy, strona której szukasz nie istnieje lub została przeniesiona.", cta: "Wróć do strony głównej" },
  en: { title: "Page Not Found", description: "Sorry, the page you are looking for does not exist or has been moved.", cta: "Return to Home" },
  de: { title: "Seite nicht gefunden", description: "Entschuldigung, die gesuchte Seite existiert nicht oder wurde verschoben.", cta: "Zurück zur Startseite" },
  pt: { title: "Página Não Encontrada", description: "Desculpe, a página que procura não existe ou foi movida.", cta: "Voltar à Página Inicial" },
};

function detectLocale(): string {
  if (typeof window === "undefined") return "en";
  const match = window.location.pathname.match(/^\/(pl|en|de|pt)\b/);
  return match ? match[1] : "pl";
}

export default function NotFoundPage() {
  const [locale, setLocale] = useState("en");
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocale(detectLocale());

    const stored = localStorage.getItem("theme");
    const htmlDark = document.documentElement.classList.contains("dark");
    const sysDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (stored === "light") setDark(false);
    else if (stored === "dark") setDark(true);
    else if (htmlDark) setDark(true);
    else setDark(sysDark);

    setMounted(true);
  }, []);

  const t = translations[locale] || translations.en;

  const bg = dark ? "#020617" : "#FAF9F7";
  const text = dark ? "#e2e8f0" : "#1C1C1E";
  const muted = dark ? "#94a3b8" : "#6B7280";
  const c404 = dark ? "#1e293b" : "#E5E3DF";
  const btnBg = dark ? "#f1f5f9" : "#1C1C1E";
  const btnText = dark ? "#020617" : "#fff";

  return (
    <>
      <style>{`
        :root { color-scheme: light dark; }
        .nf-bg { background-color: #FAF9F7; }
        .nf-text { color: #1C1C1E; }
        .nf-muted { color: #6B7280; }
        .nf-404 { color: #E5E3DF; }
        .nf-btn { background-color: #1C1C1E; color: #fff; }
        .nf-logo-light { display: inline; }
        .nf-logo-dark { display: none; }
        @media (prefers-color-scheme: dark) {
          .nf-bg { background-color: #020617; }
          .nf-text { color: #e2e8f0; }
          .nf-muted { color: #94a3b8; }
          .nf-404 { color: #1e293b; }
          .nf-btn { background-color: #f1f5f9; color: #020617; }
          .nf-logo-light { display: none; }
          .nf-logo-dark { display: inline; }
        }
      `}</style>
      <div
        className={!mounted ? "nf-bg" : undefined}
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 2rem",
          fontFamily: "system-ui, -apple-system, sans-serif",
          transition: "background-color 0.3s",
          ...(mounted ? { backgroundColor: bg } : {}),
        }}
      >
        <div style={{ position: "absolute", top: "2rem", left: "2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          <img
            src="/images/silvet-light.png"
            alt="Silvet"
            className={!mounted ? "nf-logo-light" : undefined}
            style={{ height: "4rem", width: "auto", display: mounted ? (dark ? "none" : "inline") : undefined }}
          />
          <img
            src="/images/silvet-dark.png"
            alt="Silvet"
            className={!mounted ? "nf-logo-dark" : undefined}
            style={{ height: "4rem", width: "auto", display: mounted ? (dark ? "inline" : "none") : undefined }}
          />
          <span
            className={!mounted ? "nf-logo-text" : undefined}
            style={{ fontSize: "1.25rem", fontWeight: 300, letterSpacing: "0.2em", fontStyle: "italic", color: mounted ? text : undefined }}
          >
            SILVET
          </span>
        </div>

        <div style={{ textAlign: "center" }}>
          <p
            className={!mounted ? "nf-404" : undefined}
            style={{ fontSize: "8rem", fontFamily: "Georgia, serif", lineHeight: 1, marginBottom: "1rem", userSelect: "none", transition: "color 0.3s", color: mounted ? c404 : undefined }}
          >
            404
          </p>
          <h1
            className={!mounted ? "nf-text" : undefined}
            style={{ fontSize: "1.875rem", fontFamily: "Georgia, serif", letterSpacing: "0.025em", marginBottom: "1rem", transition: "color 0.3s", color: mounted ? text : undefined }}
          >
            {t.title}
          </h1>
          <p
            className={!mounted ? "nf-muted" : undefined}
            style={{ fontSize: "1.125rem", fontWeight: 300, letterSpacing: "0.025em", maxWidth: "28rem", margin: "0 auto 2.5rem", transition: "color 0.3s", color: mounted ? muted : undefined }}
          >
            {t.description}
          </p>
          <Link
            href="/"
            className={!mounted ? "nf-btn" : undefined}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "1rem 2rem",
              fontSize: "0.875rem",
              fontWeight: 300,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "background-color 0.3s, color 0.3s",
              ...(mounted ? { backgroundColor: btnBg, color: btnText } : {}),
            }}
          >
            {t.cta}
          </Link>
        </div>
      </div>
    </>
  );
}

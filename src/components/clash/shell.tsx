import { useEffect, useState, type ReactNode } from "react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function Mark({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" className="fill-fg" />
      <polygon points="16,4 28,16 16,28" className="fill-bg" />
      <polygon points="16,4 4,16 16,28" className="fill-accent" />
    </svg>
  );
}

export function Shell({
  children,
  configured,
}: {
  children: ReactNode;
  configured: boolean;
}) {
  const { t, locale, setLocale } = useI18n();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("clashiq-theme", next ? "dark" : "light");
    setDark(next);
  }

  return (
    <div className="min-h-screen">
      <a href="#compare" className="sr-only focus:not-sr-only focus:absolute focus:z-10 focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg">
        {t("compare")}
      </a>
      <header className="border-b border-border">
        <div className="flex h-1">
          <div className="h-full flex-1 bg-accent" />
          <div className="h-full flex-1 bg-fg" />
        </div>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4">
          <div className="flex items-center gap-3">
            <Mark />
            <div>
              <p className="font-display text-2xl leading-none tracking-tight">{t("brand")}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="quiet"
              aria-label={t("language")}
              onClick={() => setLocale(locale === "en" ? "fa" : "en")}
            >
              {locale === "en" ? "فارسی" : "English"}
            </Button>
            <Button type="button" variant="quiet" onClick={toggleTheme} aria-pressed={dark}>
              {dark ? t("themeLight") : t("themeDark")}
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:py-12">{children}</main>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-muted">
          <p>{configured ? t("liveOn") : t("liveOff")}</p>
          <p>{t("footerNote")}</p>
          <p>{t("notAffiliated")}</p>
          <p>{t("capNote")}</p>
        </div>
      </footer>
    </div>
  );
}

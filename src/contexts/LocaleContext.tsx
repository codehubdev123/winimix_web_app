"use client";

import type React from "react";

import { createContext, useContext, useState, useEffect } from "react";

type Locale = "ar" | "en";

interface LanguageContextType {
  locale: Locale;
  changeLocale: () => void;
  t: (key: string) => string;
}

const translations = {
  ar: {
    "site.name": "دبي لقطع غيار السيارات",
    "site.tagline": "قطع غيار عالية الجودة",
  },
  en: {
    "site.name": "AutoSpares Pro",
    "site.tagline": "Premium Auto Parts",
  },
};

const LocaleContext = createContext<LanguageContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("ar");

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("locale");
        if (saved === "ar" || saved === "en") {
          setLocale(saved as Locale);
        }
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("locale", locale);
      } catch {}
    }
    // Apply RTL/LTR to document
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
  }, [locale]);

  const changeLocale = () => {
    setLocale((prev) => (prev === "ar" ? "en" : "ar"));
  };

  const t = (key: string): string => {
    return (
      translations[locale][key as keyof (typeof translations)[typeof locale]] ||
      key
    );
  };

  return (
    <LocaleContext.Provider value={{ locale, changeLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}

"use client";

import { createContext, useContext, useEffect } from "react";
import { dictionaries, type Dict, type Locale } from "@/lib/i18n";

// Defaults to the Russian dictionary, so any component rendered without a
// provider (e.g. the legacy v1 experience) keeps its original copy.
const DictContext = createContext<Dict>(dictionaries.ru);

export function LocaleProvider({
  locale = "ru",
  children,
}: {
  locale?: Locale;
  children: React.ReactNode;
}) {
  // Keep <html lang> in sync with the active locale (layout ships lang="ru").
  useEffect(() => {
    const prev = document.documentElement.lang;
    document.documentElement.lang = locale;
    return () => {
      document.documentElement.lang = prev;
    };
  }, [locale]);

  return (
    <DictContext.Provider value={dictionaries[locale]}>
      {children}
    </DictContext.Provider>
  );
}

export function useDict(): Dict {
  return useContext(DictContext);
}

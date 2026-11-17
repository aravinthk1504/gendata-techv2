"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";
import ScrollToTop from "./ScrollToTop";

export default function SiteChrome({ lang, navigation, footer, children }) {
  const pathname = usePathname() || "";
  const isAdmin = /^\/(en|de)\/admin(?:\/|$)/.test(pathname);

  // Admin forms use the native cursor rather than the public marketing cursor.
  if (isAdmin) return <>{children}</>;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:font-medium focus:text-[#002DCC] focus:shadow-lg"
      >
        {lang === "de" ? "Zum Inhalt springen" : "Skip to content"}
      </a>
      <CustomCursor />
      <ScrollToTop />
      <Navbar lang={lang} navigation={navigation} />
      {children}
      <Footer lang={lang} content={footer} />
    </>
  );
}

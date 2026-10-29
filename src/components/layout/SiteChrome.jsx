"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";
import ScrollToTop from "./ScrollToTop";

export default function SiteChrome({ lang, navigation, footer, children }) {
  const pathname = usePathname() || "";
  const isAdmin = /^\/(en|de)\/admin(?:\/|$)/.test(pathname);

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <CustomCursor />
      <ScrollToTop />
      <Navbar lang={lang} navigation={navigation} />
      {children}
      <Footer lang={lang} content={footer} />
    </>
  );
}

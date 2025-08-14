import "./../styles/globals.css";
import Nav from "@/components/Nav";
import { SITE } from "@/lib/seo";
import type { Metadata } from "next";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";

export const metadata: Metadata = {
 
  title: `${SITE.name}`,
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  openGraph: { title: `${SITE.name}`, description: SITE.description, url: SITE.url, siteName: SITE.name, images: [{ url: "/og-image.png" }], locale: "da_DK", type: "website" },
  icons: { icon: "/favicon.ico" }, alternates: { canonical: "/" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da" className="dark">
      <body className="bg-black text-zinc-100 selection:bg-indigo-500/30">
        <LanguageProvider> 
          <Nav />
          {children}
          <footer className="max-w-5xl mx-auto px-4 py-10 text-sm text-white/60">
            © {new Date().getFullYear()} Elisabeth Lennert — CodeBloodedMama
          </footer>
        </LanguageProvider>
      </body>
    </html>
  );
}

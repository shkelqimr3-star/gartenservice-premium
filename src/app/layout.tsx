import type { Metadata } from "next";
import { seoKeywords, siteUrl } from "@/lib/site";
import "./globals.css";

const ogImage =
  "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1200&h=630&q=85";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Gartenservice Backnang | Gartenservice Sami & Co.",
    template: "%s | Gartenservice Sami & Co.",
  },
  description:
    "Gartenservice Sami & Co. ist Ihr zuverlaessiger Gartenservice in Backnang und Umgebung fuer Gartenpflege, Hecke schneiden, Rasen maehen, Baeume faellen und Gruenschnitt-Abtransport.",
  keywords: seoKeywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteUrl,
    siteName: "Gartenservice Sami & Co.",
    title: "Gartenservice Backnang | Gartenservice Sami & Co.",
    description:
      "Professionelle Gartenpflege in Backnang und Umgebung: Hecke schneiden, Rasen maehen, Baeume faellen, Gartenpflege und Abtransport.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Gartenservice Sami & Co. in Backnang",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full scroll-smooth">
      <body className="min-h-full bg-[#f8f3ea] text-[#17352a] antialiased">{children}</body>
    </html>
  );
}

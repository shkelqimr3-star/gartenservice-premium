import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gartenservice Sami & Co. | Gartenpflege in Backnang",
  description:
    "Zuverlaessiger Gartenservice fuer Hecken, Rasen, Baumarbeiten, Gartenpflege und Entsorgung in Backnang und Umgebung.",
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

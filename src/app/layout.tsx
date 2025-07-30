import type { Metadata } from "next";
import "./globals.css";

import { Roboto } from "next/font/google";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "E-Commerce Platform",
  description: "ecommerce platform built with Next.js and sanity",
};
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}

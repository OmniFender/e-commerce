import type { Metadata } from "next";

import Footer from "@/components/footer/Footer";

import "./globals.css";
import { SanityLive } from "@/sanity/lib/live";

export const metadata: Metadata = {
  title: "E-Commerce Platform",
  description: "ecommerce platform built with Next.js and sanity",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>{children}</main>
      <Footer />
      <SanityLive />
    </>
  );
}

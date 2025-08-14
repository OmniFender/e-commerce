import type { Metadata } from "next";

import { SanityLive } from "@/sanity/lib/live";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

import "./globals.css";

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
      <Header />
      <main>{children}</main>
      <Footer />
      <SanityLive />
    </>
  );
}

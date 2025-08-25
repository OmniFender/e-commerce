import type { Metadata } from "next";

import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { ANNOUNCEMENT_BAR_SETTIGNS } from "@/sanity/lib/queries";
import AnnouncementBar from "@/components/announcement-bar/AnnouncementBar";

import "./globals.css";
import { ANNOUNCEMENT_BAR_SETTIGNSResult } from "@/sanity/types";

export const metadata: Metadata = {
  title: "E-Commerce Platform",
  description: "ecommerce platform built with Next.js and sanity",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let announcementBarSettings: ANNOUNCEMENT_BAR_SETTIGNSResult = [];

  try {
    const { data: fetchedHeroSettings } = await sanityFetch({
      query: ANNOUNCEMENT_BAR_SETTIGNS,
    });
    if (fetchedHeroSettings) {
      announcementBarSettings = fetchedHeroSettings;
    }
  } catch (error) {
    console.error("Error fetching hero settings data: ", error);
  } finally {
    if (!announcementBarSettings) {
      announcementBarSettings = [
        {
          _id: "",
          announcementBar: false,
          announcementBarText: "Shopping is therapy—only more fashionable.",
        },
      ];
    }
  }

  return (
    <>
      <AnnouncementBar announcementBarSettings={announcementBarSettings} />
      <Header
        announcementBarTopPeoperty={
          announcementBarSettings[0].announcementBar ? 50 : 0
        }
      />
      <main>{children}</main>
      <Footer />
      <SanityLive />
    </>
  );
}

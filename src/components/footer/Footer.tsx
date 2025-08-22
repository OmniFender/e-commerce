import Link from "next/link";

import ScrollTopBtn from "../scroll-top-btn/ScrollTopBtn";

import { sanityFetch } from "@/sanity/lib/live";
import { FOOTER_INFO, FOOTER_NEW_SECTION } from "@/sanity/lib/queries";

import { TiSocialFacebook } from "react-icons/ti";
import {
  FaArrowUp,
  FaEnvelope,
  FaLinkedin,
  FaMapMarked,
  FaPhone,
} from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { RxInstagramLogo } from "react-icons/rx";

import classes from "./footer.module.scss";

export default async function Footer() {
  let footerInfo = null;
  let footerNewSection = null;

  try {
    const { data: fetchedFooterInfo } = await sanityFetch({
      query: FOOTER_INFO,
    });
    if (fetchedFooterInfo) {
      footerInfo = fetchedFooterInfo;
    }
  } catch (error) {
    console.error("Error fetching footer info data:", error);
  } finally {
    if (!footerInfo) {
      footerInfo = [
        {
          description: "some fallback text",
          emailAddress: "fallback@example.com",
          phoneNumber: "+201234567890",
          address: "Fallback Address",
        },
      ];
    }
  }

  try {
    const { data: FetchedFooterNewSection } = await sanityFetch({
      query: FOOTER_NEW_SECTION,
    });
    if (FetchedFooterNewSection) {
      footerNewSection = FetchedFooterNewSection;
    }
  } catch (error: unknown) {
    console.error("Error fetching footer new section data:", error);
  } finally {
    if (!footerNewSection) {
      footerNewSection = [
        {
          _id: "fallback-section",
          sectionTitle: "Fallback Section",
          sectionList: [
            {
              _key: "fallback-item",
              itemName: "Fallback Item",
              url: "https://www.example.com",
            },
          ],
        },
      ];
    }
  }

  return (
    <footer className={classes.footer}>
      <div className={classes.footer__container}>
        <div className={classes["footer__container-content"]}>
          <div className={classes["footer__container-content-logo"]}>
            <h4>E-commerce</h4>
          </div>
          {footerInfo[0].description && (
            <div className={classes["footer__container-content-description"]}>
              <p>{footerInfo[0]?.description}</p>
            </div>
          )}
          <div className={classes["footer__container-content-backlinks"]}>
            <ul>
              <li>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <RxInstagramLogo />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <TiSocialFacebook />
                </a>
              </li>
              <li>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <RiTwitterXFill />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={classes["footer__container-navigation"]}>
          <h4>Site Map</h4>
          <ul>
            <li>
              <Link href="/policy">Terms of policy</Link>
            </li>
            <li>
              <Link href="/home">About Us</Link>
            </li>
            <li>
              <Link href="/info">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className={classes["footer__container-contact"]}>
          <h4>Contact Us</h4>
          <ul>
            {footerInfo[0].emailAddress && (
              <li>
                <a
                  href={`mailto:${footerInfo[0]?.emailAddress || "abdelrahmanemad2712@gmail.com"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Email"
                >
                  <FaEnvelope />
                </a>
              </li>
            )}

            {footerInfo[0].phoneNumber && (
              <li>
                <a
                  href={`tel:+${footerInfo[0]?.phoneNumber || "201065384257"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Phone"
                >
                  <FaPhone />
                </a>
              </li>
            )}

            {footerInfo[0].address && (
              <li>
                <a
                  href={
                    footerInfo[0].address ||
                    "https://www.google.com/maps/place/121+React+St,+Giza,+Egypt"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Address"
                >
                  <FaMapMarked />
                </a>
              </li>
            )}
          </ul>
        </div>
        {footerNewSection &&
          footerNewSection.map((section) => (
            <div
              key={section._id}
              className={classes["footer__container-newSection"]}
            >
              <h4>{section.sectionTitle}</h4>
              <ul>
                {section.sectionList?.map((item) => (
                  <li key={item._key}>
                    <a
                      href={item.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.itemName}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
      <p className={classes.footer__copyright}>
        &copy; {new Date().getFullYear()} E-commerce. All rights reserved.
      </p>
      <ScrollTopBtn>
        <FaArrowUp />
      </ScrollTopBtn>
    </footer>
  );
}

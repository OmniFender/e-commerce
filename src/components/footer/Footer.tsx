import Link from "next/link";

import ScrollTopBtn from "../scrollTopBtn/ScrollTopBtn";

import { client } from "@/sanity/lib/client";
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

const options = { next: { revalidate: 60 } };

export default async function Footer() {
  const footerInfo = await client.fetch(FOOTER_INFO, {}, options);
  const footerNewSection = await client.fetch(FOOTER_NEW_SECTION, {}, options);

  return (
    <footer className={classes.footer}>
      <div className={classes.footer__container}>
        <div className={classes.footer__content}>
          <div className={classes.footer__logo}>
            <h4>E-commerce</h4>
          </div>
          <div className={classes.footer__description}>
            <p>{footerInfo[0]?.description}</p>
          </div>
          <div className={classes.footer__backlinks}>
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
        <div className={classes.footer__navigation}>
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
        <div className={classes.footer__contact}>
          <h4>Contact Us</h4>
          <ul>
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
            <li>
              <a
                href={`tel:+2${footerInfo[0]?.phoneNumber || "tel:+201065384257"}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Phone"
              >
                <FaPhone />
              </a>
            </li>
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
          </ul>
        </div>
        {footerNewSection &&
          footerNewSection.map((section) => (
            <div key={section._id} className={classes.footer_newSection}>
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

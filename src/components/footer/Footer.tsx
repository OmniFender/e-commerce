import Link from "next/link";

import ScrollTopBtn from "../scrollTopBtn/ScrollTopBtn";

import { TiSocialFacebook } from "react-icons/ti";
import { FaLinkedin } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { RxInstagramLogo } from "react-icons/rx";

import classes from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.footer__container}>
        <div className={classes.footer__content}>
          <div className={classes.footer__logo}>
            <h4>E-commerce</h4>
          </div>
          <div className={classes.footer__description}>
            <p>
              Your one-stop shop for all your needs. Discover a wide range of
              products at unbeatable prices. Shop now and enjoy fast shipping
              and excellent customer service.
            </p>
          </div>
          <div className={classes.footer__backlinks}>
            <ul>
              <li>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <RxInstagramLogo />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
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
          <ScrollTopBtn className={classes.footer__button} />
        </div>
        <div className={classes.footer__details}>
          <div className={classes.footer__navigation}>
            <h4>Site Map</h4>
            <ul>
              <li>
                <Link href="/HomePage">About Us</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/info">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/policy">Terms of policy</Link>
              </li>
            </ul>
          </div>
          <div className={classes.footer__contact}>
            <h4>Contact Us</h4>
            <ul>
              <li>
                Email:
                <a href="mailto:abdelrahmanemad2712@gmail.com">
                  abdelrahmanemad2712@gmail.com
                </a>
              </li>
              <li>
                Phone: <a href="tel:+201065384257">+20 106 538 4257</a>
              </li>
              <li>
                Address:{" "}
                <a href="https://www.google.com/maps/place/121+React+St,+Giza,+Egypt">
                  121 React St, Giza, Egypt
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className={classes.footer__copyright}>
        Copyright © 2024, E-commerce. All rights reserved.
      </p>
    </footer>
  );
}

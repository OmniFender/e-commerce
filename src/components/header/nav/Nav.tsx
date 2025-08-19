"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";

import classes from "./nav.module.scss";

function Nav() {
  const { scrollYProgress } = useScroll();
  const padding = useTransform(scrollYProgress, [0, 0.1, 0.2], ["20px", "15px", "10px"]);
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <Link href="/" passHref legacyBehavior>
            <motion.a style={{ padding }}>Shop</motion.a>
          </Link>
        </li>
        <li>
          <Link href="/" passHref legacyBehavior>
            <motion.a style={{ padding }}>Contact Us</motion.a>
          </Link>
        </li>
        <li>
          <Link href="/" passHref legacyBehavior>
            <motion.a style={{ padding }}>About Us</motion.a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;

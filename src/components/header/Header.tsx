"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaShoppingBag, FaUserAlt } from "react-icons/fa";
import { motion, useScroll, useTransform } from "motion/react";

import Nav from "./nav/Nav";
import Menu from "./menu/Menu";
import classes from "./header.module.scss";
import whiteLogo from "../../../public/logos/Hamilton-white.svg";
import blackLogo from "../../../public/logos/Hamilton-black.svg";

function Header() {
  const { scrollYProgress } = useScroll();
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
    [
      "transparent",
      "rgba(255,56,92,0.1)",
      "rgba(255,56,92,0.2)",
      "rgba(255,56,92,0.3)",
      "rgba(255,56,92,0.4)",
      "rgba(255,56,92,0.5)",
      "rgba(255,56,92,0.6)",
      "rgba(255,56,92,0.7)",
      "rgba(255,56,92,0.8)",
    ]
  );

  const router = usePathname();

  const isHomePage = router === "/" ? true : false;


function Header({ announcementBarTopPeoperty }: { announcementBarTopPeoperty: number }) {
  const [scroll, setScroll] = useState(announcementBarTopPeoperty);

  const { scrollYProgress } = useScroll();
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
    [
      "transparent",
      "rgba(255,56,92,0.1)",
      "rgba(255,56,92,0.2)",
      "rgba(255,56,92,0.3)",
      "rgba(255,56,92,0.4)",
      "rgba(255,56,92,0.5)",
      "rgba(255,56,92,0.6)",
      "rgba(255,56,92,0.7)",
      "rgba(255,56,92,0.8)",
    ]
  );

  const router = usePathname();

  const isHomePage = router === "/" ? true : false;

  useEffect(() => {
    if (!announcementBarTopPeoperty) {
      setScroll(0);
      return;
    } else {
      setScroll(50);
    }

    addEventListener("scroll", scrollHandling);
    return () => {
      removeEventListener("scroll", scrollHandling);
    };
  }, [announcementBarTopPeoperty]);

  function scrollHandling() {
    if (window !== undefined) {
      const scrollY = window.scrollY;
      if (scrollY <= 50) {
        setScroll(50 - scrollY);
      }
      if (scrollY > 50) {
        setScroll(0);
      }
    }
  }

  return (
    <motion.header
      className={classes.header}
      style={
        isHomePage

          ? { backgroundColor }
          : {
              backgroundColor: "#fff",
              borderBottomColor: "rgba(108, 117, 125, 0.2)",

          ? { backgroundColor, top: `${scroll}px` }
          : {
              backgroundColor: "#fff",
              borderBottomColor: "rgba(108, 117, 125, 0.2)",
              top: `${scroll}px`,

            }
      }
    >
      <div className={classes["header__logo"]}>
        <Link href="/">
          <Image
            src={isHomePage ? whiteLogo : blackLogo}
            alt="Hamilton SVG Star Logo"
            className={classes["header__logo-image"]}
            priority
          />
        </Link>
      </div>
      <div className={classes["header__nav"]}>
        <Nav isHomePage={isHomePage} />
      </div>
      <div className={classes["header__controls"]}>
        <Link
          href="/"
          className={`${!isHomePage && classes["header__controls-link--not-home"]} ${classes["header__controls-link"]} ${classes.mobile}`}
        >
          <FaUserAlt />
        </Link>
        <Link
          href="/"
          className={`${!isHomePage && classes["header__controls-link--not-home"]} ${classes["header__controls-link"]}`}
        >
          <FaShoppingBag />
          <span className={classes["header__cart-count"]}>4</span>
        </Link>
        <Menu isHomePage={isHomePage} />
      </div>
    </motion.header>
  );
}

export default Header;

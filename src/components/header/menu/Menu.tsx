"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { AnimatePresence, motion } from "motion/react";

import useClickOutside from "@/hooks/use-click-outside/useClickOutside";

import classes from "./menu.module.scss";

function Menu({ isHomePage }: { isHomePage: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuref = useRef(null);

  useClickOutside(menuref, () => {
    if (isOpen) setIsOpen(false);
  });

  function handleMenuToggle() {
    setIsOpen((prev) => !prev);
  }

  function handleMenuCloseOnLinkClick(
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) {
    const target = e.target as HTMLElement;
    if (target.tagName === "A") {
      setIsOpen(false);
    }
  }

  return (
    <>
      <button
        onClick={handleMenuToggle}
        className={`${isHomePage ? "" : classes["menu__button--not-home"]} ${classes["menu__button"]}`}
      >
        <TiThMenu />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuref}
            onClick={(e) => handleMenuCloseOnLinkClick(e)}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3, ease: "easeIn" }}
            className={classes.menu}
          >
            <ul>
              <li>
                <Link href="/">Help Center</Link>
              </li>
              <li>
                <Link href="/">Gift Cards</Link>
              </li>
              <li>
                <Link href="/">Our Stores</Link>
              </li>
            </ul>
            <div className={`${classes.mobile} divider`} />
            <ul className={classes.mobile}>
              <li>
                <Link href="/shop">Shop</Link>
              </li>
              <li>
                <Link href="/">About Us</Link>
              </li>
              <li>
                <Link href="/">Contact Us</Link>
              </li>
            </ul>
            <div className={`${classes.mobile} divider`} />
            <ul className={classes.mobile}>
              <li>
                <Link href="/">Log In / Sign Up</Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Menu;

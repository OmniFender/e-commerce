"use client";

import { useRef, useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { AnimatePresence, motion } from "motion/react";

import useClickOutside from "@/hooks/use-click-outside/useClickOutside";

import classes from "./menu.module.scss";

function Menu() {
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
    if (target.tagName === "LI") {
      setIsOpen(false);
    }
  }

  return (
    <>
      <button onClick={handleMenuToggle} className={classes["menu__button"]}>
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
              <li>Help Center</li>
              <li>Gift Cards</li>
              <li>Our Stores</li>
            </ul>
            <div className={`${classes.mobile} divider`} />
            <ul className={classes.mobile}>
              <li>Shop</li>
              <li>About Us</li>
              <li>Contact Us</li>
            </ul>
            <div className={`${classes.mobile} divider`} />
            <ul className={classes.mobile}>
              <li>Log in/ Sign Up</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Menu;

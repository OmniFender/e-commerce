import Link from "next/link";
import Image from "next/image";
import { FaShoppingBag, FaUserAlt } from "react-icons/fa";

import Nav from "./nav/Nav";
import Menu from "./menu/Menu";
import classes from "./header.module.scss";
import logo from "../../../public/logos/Hamilton-black.svg";

function Header() {
  return (
    <header className={classes.header}>
      <div className={classes["header__logo"]}>
        <Link href="/">
          <Image
            src={logo}
            alt="Hamilton SVG Star Logo"
            className={classes["header__logo-image"]}
            priority
          />
        </Link>
      </div>
      <div className={classes["header__nav"]}>
        <Nav />
      </div>
      <div className={classes["header__controls"]}>
        <Link
          href="/"
          className={`${classes["header__controls-link"]} ${classes.mobile}`}
        >
          <FaUserAlt />
        </Link>
        <Link href="/" className={classes["header__controls-link"]}>
          <FaShoppingBag />
          <span className={classes["header__cart-count"]}>4</span>
        </Link>
        <Menu />
      </div>
    </header>
  );
}

export default Header;

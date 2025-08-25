"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { generateBreadcrumbItems } from "@/utils/generateBreadcrumbItems";

import classes from "./breadcrumb.module.scss";

function Breadcrumb({ breadCrumbItems = generateBreadcrumbItems() }) {
  return (
    <ul className={`${classes.breadcrumb}`}>
      {breadCrumbItems.map((item, i) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const isActive = usePathname() === item.href;
        return (
          <li key={item.label}>
            {i === breadCrumbItems.length - 1 ? (
              <Link
                href={item.href}
                className={`${isActive && classes["breadcrumb--active"]}`}
              >{`${item.label}`}</Link>
            ) : (
              <Link href={item.href}>{`${item.label} /`}</Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default Breadcrumb;

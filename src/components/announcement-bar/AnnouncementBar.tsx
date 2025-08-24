import { Fragment } from "react";

import { ANNOUNCEMENT_BAR_SETTIGNSResult } from "@/sanity/types";

import classes from "./announcement-bar.module.scss";

function AnnouncementBar({
  announcementBarSettings,
}: {
  announcementBarSettings: ANNOUNCEMENT_BAR_SETTIGNSResult;
}) {
  if (announcementBarSettings[0].announcementBar) {
    return (
      <section className={classes["announcement-bar"]}>
        <ul>
          {Array.from({ length: 20 }).map((_, index) => (
            <Fragment key={index}>
              <li>{announcementBarSettings[0].announcementBarText}</li>
              <span>⚝</span>
            </Fragment>
          ))}
          {Array.from({ length: 20 }).map((_, index) => (
            <Fragment key={index}>
              <li>{announcementBarSettings[0].announcementBarText}</li>
              <span>⚝</span>
            </Fragment>
          ))}
        </ul>
      </section>
    );
  }
}

export default AnnouncementBar;

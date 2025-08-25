import { Fragment } from "react";

import { timeToReadAnnouncementBarText } from "@/utils/utils";
import { ANNOUNCEMENT_BAR_SETTIGNSResult } from "@/sanity/types";

import classes from "./announcement-bar.module.scss";

function AnnouncementBar({
  announcementBarSettings,
}: {
  announcementBarSettings: ANNOUNCEMENT_BAR_SETTIGNSResult;
}) {
  const announcementText = `${announcementBarSettings[0].announcementBarText}`;
  const animationDuration = `${timeToReadAnnouncementBarText(announcementText) * 40}s`;

  if (announcementBarSettings[0].announcementBar) {
    return (
      <section className={classes["announcement-bar"]}>
        <ul style={{ animationDuration }}>
          {Array.from({ length: 20 }).map((_, index) => (
            <Fragment key={index}>
              <li>{announcementText}</li>
              <span>⚝</span>
            </Fragment>
          ))}
          {Array.from({ length: 20 }).map((_, index) => (
            <Fragment key={index}>
              <li>{announcementText}</li>
              <span>⚝</span>
            </Fragment>
          ))}
        </ul>
      </section>
    );
  }
}

export default AnnouncementBar;

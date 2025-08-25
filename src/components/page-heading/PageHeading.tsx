import { cabin, eduNSWACTCursive } from "@/utils/fonts";
import Breadcrumb from "@/helper_components/breadcrumb/Breadcrumb";

import classes from "./page-heading.module.scss";

function PageHeading({
  headingText,
  descriptionText,
}: {
  headingText: string;
  descriptionText?: string;
}) {
  return (
    <>
      <Breadcrumb />
      <h1 className={`${classes["heading-text"]} ${cabin.className}`}>
        {headingText}
      </h1>
      <p
        className={`${classes["description-text"]} ${eduNSWACTCursive.className}`}
      >
        {descriptionText}
      </p>
    </>
  );
}

export default PageHeading;

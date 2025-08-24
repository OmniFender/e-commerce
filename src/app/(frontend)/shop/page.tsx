import { cabin, eduNSWACTCursive } from "@/utils/fonts";
import classes from "./page.module.scss";
import Breadcrumb from "@/helper_components/breadcrumb/Breadcrumb";

function page() {
  return (
    <>
      <section className={classes["home-page"]}>
        <Breadcrumb />
        <h1
          className={`${classes["home-page__heading-text"]} ${cabin.className}`}
        >
          Shopping
        </h1>
        <p
          className={`${classes["home-page__description-text"]} ${eduNSWACTCursive.className}`}
        >
          Life’s short. Buy the clothes, wear the smile.
        </p>
      </section>
    </>
  );
}

export default page;

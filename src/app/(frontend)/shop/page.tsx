import PageHeading from "@/components/page-heading/PageHeading";
import classes from "./page.module.scss";

function page() {
  return (
    <>
      <section className={classes["home-page"]}>
        <PageHeading
          headingText="Shopping"
          descriptionText="Life’s short. Buy the clothes, wear the smile."
        />
      </section>
    </>
  );
}

export default page;

import PageHeading from "@/components/page-heading/PageHeading";
import classes from "./page.module.scss";
import Breadcrumb from "@/helper_components/breadcrumb/Breadcrumb";
import ProductsGrid from "@/components/products-grid/ProductsGrid";
import { Suspense } from "react";

function page() {
  return (
    <>
      <section className={classes["home-page"]}>
        <PageHeading
          headingText="Shopping"
          descriptionText="Life’s short. Buy the clothes, wear the smile."
        />
      </section>

      {/* just initial loading state untill we implement the full loading logic */}
      <Suspense fallback={<div className={classes.loading}>Loading...</div>}>
        <ProductsGrid />
      </Suspense>
    </>
  );
}

export default page;

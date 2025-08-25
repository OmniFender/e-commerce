import { Suspense } from "react";

import PageHeading from "@/components/page-heading/PageHeading";
import ProductsGrid from "@/components/products-grid/ProductsGrid";

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

      {/* just initial loading state untill we implement the full loading logic */}
      <Suspense fallback={<div className={classes.loading}>Loading...</div>}>
        <ProductsGrid />
      </Suspense>
    </>
  );
}

export default page;

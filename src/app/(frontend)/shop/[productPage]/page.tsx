import ProductInfo from "@/components/product-information/ProductInfo";

import { client } from "@/sanity/lib/client";
import { PRODUCT_BY_SLUG } from "@/sanity/lib/queries";

import classes from "./page.module.scss";

async function page({ params }: { params: Promise<{ productPage: string }> }) {
  const { productPage } = await params;

  const product = await client.fetch(PRODUCT_BY_SLUG, { slug: productPage });
  return (
    <>
      <section className={classes["product-page"]}>
        <ProductInfo product={product} />
      </section>
    </>
  );
}

export default page;

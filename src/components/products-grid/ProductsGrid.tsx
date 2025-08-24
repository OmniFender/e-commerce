// import Link from "next/link";
// import Image from "next/image";

// import { urlFor } from "@/sanity/lib/image";
// import { formattedPrice } from "@/utils/utils";
import { sanityFetch } from "@/sanity/lib/live";
import { PRODUCTS } from "@/sanity/lib/queries";
import { PRODUCTSResult } from "@/sanity/types";

import classes from "./products-grid.module.scss";
import ProductCard from "../featured-products/product-card/ProductCard";

export default async function ProductsGrid() {
  let products: PRODUCTSResult | null = null;
  try {
    const { data: fetchedProducts } = await sanityFetch({ query: PRODUCTS });
    if (fetchedProducts) {
      products = fetchedProducts;
    }
  } catch (error) {
    console.error("Error fetching products: ", error);
  } finally {
    if (!products) {
      products = [];
    }
  }

  return (
    <div className={classes["products-grid"]}>
      {products.map((product: PRODUCTSResult[number]) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
